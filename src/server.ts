import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function getEnvValue(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim() !== "") return value.trim();
  }
  return undefined;
}

function normalizePaymentMethod(method?: string, provider?: string): string | null {
  const value = (method ?? provider ?? "").toLowerCase();
  if (value === "orange" || value === "orange-money" || value === "orange_money") {
    return "orange";
  }
  if (value === "wave" || value === "wave-senegal" || value === "wave_senegal") {
    return "wave";
  }
  return null;
}

function normalizeAmount(value: unknown): number | null {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function normalizePhoneNumber(phone: string): string {
  return phone
    .replace(/\s+/g, "")
    .replace(/^\+221/, "")
    .replace(/^221/, "");
}

function getPaydunyaConfig() {
  const mode = getEnvValue("PAYDUNYA_MODE", "PAYDUNYA_ENV", "test") ?? "test";
  const apiBase = getEnvValue(
    "PAYDUNYA_API_BASE",
    mode === "test" ? "https://app.paydunya.com/sandbox-api/v1" : "https://app.paydunya.com/api/v1",
  );
  const masterKey = getEnvValue("PAYDUNYA_MASTER_KEY", "PAYDUNYA_MERCHANT_KEY");
  const privateKey = getEnvValue("PAYDUNYA_PRIVATE_KEY", "PAYDUNYA_SECRET_KEY");
  const token = getEnvValue("PAYDUNYA_TOKEN", "PAYDUNYA_API_TOKEN");

  return {
    mode,
    apiBase,
    masterKey,
    privateKey,
    token,
  };
}

async function buildPaydunyaCheckoutSession(
  amount: number,
  phone: string,
  provider: "orange" | "wave",
) {
  const { apiBase, masterKey, privateKey, token, mode } = getPaydunyaConfig();

  if (!apiBase || !masterKey || !privateKey || !token) {
    return null;
  }

  const invoiceNumber = `DGSTYLE-${Date.now()}`;
  const methodLabel = provider === "orange" ? "Orange Money" : "Wave";
  const normalizedPhone = normalizePhoneNumber(phone);

  let response: Response;
  try {
    response = await fetch(`${apiBase.replace(/\/$/, "")}/checkout-invoice/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Paydunya-Master-Key": masterKey,
        "X-Paydunya-Private-Key": privateKey,
        "X-Paydunya-Mode": mode,
      },
      body: JSON.stringify({
        master_key: masterKey,
        private_key: privateKey,
        token,
        mode,
        invoice: {
          invoice_number: invoiceNumber,
          total_amount: String(amount),
          description: `Commande DGStyle - ${methodLabel}`,
          currency: "XOF",
          tax_amount: 0,
          discount_amount: 0,
        },
        store: {
          name: "DGStyle",
          tagline: "Atelier de mode à Dakar",
          postal_address: "Dakar, Sénégal",
          phone_number: normalizedPhone,
          email: "contact@dgstyle.sn",
        },
        custom_data: {
          provider,
          phone: normalizedPhone,
        },
      }),
    });
  } catch (error) {
    console.error("[PayDunya] network error while creating checkout session", error);
    return null;
  }

  const payloadText = await response.text();
  let payload: Record<string, unknown> | null = null;

  try {
    payload = JSON.parse(payloadText) as Record<string, unknown>;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.error === "string"
          ? payload.error
          : payloadText || "PayDunya checkout creation failed";
    console.error("[PayDunya] checkout rejected", {
      status: response.status,
      mode,
      apiBase,
      provider,
      phone: normalizedPhone,
      message: message.slice(0, 500),
    });
    return null;
  }

  const redirectUrl =
    typeof payload?.data?.url === "string"
      ? payload.data.url
      : typeof payload?.data?.checkout_url === "string"
        ? payload.data.checkout_url
        : typeof payload?.data?.response_text === "string"
          ? payload.data.response_text
          : typeof payload?.redirect_url === "string"
            ? payload.redirect_url
            : typeof payload?.url === "string"
              ? payload.url
              : undefined;

  return {
    status: "ok",
    provider,
    phone: normalizedPhone,
    amount,
    redirectUrl,
    paymentId: invoiceNumber,
    message: redirectUrl ? "payment_request_sent" : "payment_request_sent_mock",
  } satisfies Record<string, unknown>;
}

async function buildWaveCheckoutSession(amount: number, phone: string) {
  const apiKey = getEnvValue("WAVE_API_KEY", "VITE_WAVE_API_KEY", "AIDA_WAVE_API_KEY");
  const apiBase = getEnvValue("WAVE_API_BASE", "AIDA_WAVE_API_URL", "https://api.wave.com");
  const successUrl = getEnvValue(
    "WAVE_SUCCESS_URL",
    "AIDA_WAVE_SUCCESS_URL",
    "http://localhost:5173/paiement?status=success",
  );
  const errorUrl = getEnvValue(
    "WAVE_ERROR_URL",
    "AIDA_WAVE_ERROR_URL",
    "http://localhost:5173/paiement?status=error",
  );
  const currency = getEnvValue("WAVE_CURRENCY", "AIDA_WAVE_CURRENCY", "XOF");

  if (!apiKey) {
    return {
      status: "mocked",
      provider: "wave",
      phone,
      amount,
      message: "payment_request_sent_mock",
    } satisfies Record<string, unknown>;
  }

  const response = await fetch(`${apiBase.replace(/\/$/, "")}/v1/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(amount),
      currency,
      client_reference: `dgstyle-${Date.now()}`,
      description: `DGStyle commande ${amount} ${currency}`,
      metadata: {
        provider: "wave",
        phone: normalizePhoneNumber(phone),
      },
      success_url: successUrl,
      error_url: errorUrl,
    }),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(payload || "Wave checkout creation failed");
  }

  const data = await response.json().catch(() => ({}));
  const redirectUrl =
    typeof data.wave_launch_url === "string"
      ? data.wave_launch_url
      : typeof data.redirectUrl === "string"
        ? data.redirectUrl
        : undefined;

  return {
    status: "ok",
    provider: "wave",
    phone,
    amount,
    redirectUrl,
    paymentId: typeof data.id === "string" ? data.id : undefined,
    message: redirectUrl ? "payment_request_sent" : "payment_request_sent_mock",
  } satisfies Record<string, unknown>;
}

async function getOrangeAccessToken(baseUrl: string, clientId: string, clientSecret: string) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/oauth/v3/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }).toString(),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(payload || "Orange OAuth token request failed");
  }

  const data = await response.json().catch(() => ({}));
  const token = typeof data.access_token === "string" ? data.access_token : undefined;
  if (!token) {
    throw new Error("Orange OAuth response did not include access_token");
  }

  return token;
}

async function buildOrangeCheckoutSession(amount: number, phone: string) {
  const apiBase = getEnvValue(
    "ORANGE_API_BASE",
    "ORANGE_MONEY_API_URL",
    "AIDA_ORANGE_MONEY_API_URL",
    "https://api.orange.com/orange-money-webpay",
  );
  const clientId = getEnvValue(
    "ORANGE_CLIENT_ID",
    "ORANGE_MONEY_CLIENT_ID",
    "AIDA_ORANGE_MONEY_API_USERNAME",
  );
  const clientSecret = getEnvValue(
    "ORANGE_CLIENT_SECRET",
    "ORANGE_MONEY_CLIENT_SECRET",
    "AIDA_ORANGE_MONEY_API_PASSWORD",
  );
  const merchantKey = getEnvValue(
    "ORANGE_MERCHANT_KEY",
    "ORANGE_MERCHANT_ID",
    "AIDA_ORANGE_MONEY_MERCHANT_KEY",
  );
  const currency = getEnvValue("ORANGE_CURRENCY", "AIDA_ORANGE_MONEY_CURRENCY", "XOF");
  const successUrl = getEnvValue(
    "ORANGE_SUCCESS_URL",
    "AIDA_ORANGE_SUCCESS_URL",
    "http://localhost:5173/paiement?status=success",
  );
  const errorUrl = getEnvValue(
    "ORANGE_ERROR_URL",
    "AIDA_ORANGE_ERROR_URL",
    "http://localhost:5173/paiement?status=error",
  );
  const siteUrl = getEnvValue("PUBLIC_SITE_URL", "SITE_URL", "http://localhost:5173");
  const notificationUrl = getEnvValue(
    "ORANGE_NOTIFICATION_URL",
    "AIDA_ORANGE_NOTIFICATION_URL",
    `${siteUrl}/api/payments/webhook/orange`,
  );

  if (!apiBase || !clientId || !clientSecret || !merchantKey) {
    throw new Error(
      "Orange Money API non configurée. Ajoutez ORANGE_API_BASE, ORANGE_CLIENT_ID, ORANGE_CLIENT_SECRET et ORANGE_MERCHANT_KEY.",
    );
  }

  const accessToken = await getOrangeAccessToken(apiBase, clientId, clientSecret);
  const reference = `dgstyle-${Date.now()}`;

  const response = await fetch(`${apiBase.replace(/\/$/, "")}/webpayment/v3/pay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merchant_key: merchantKey,
      currency,
      order_id: reference,
      amount,
      return_url: successUrl,
      cancel_url: errorUrl,
      notif_url: notificationUrl,
      lang: "fr",
      reference: normalizePhoneNumber(phone),
    }),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(payload || "Orange payment initiation failed");
  }

  const data = await response.json().catch(() => ({}));
  const redirectUrl =
    typeof data.payment_url === "string"
      ? data.payment_url
      : typeof data.redirectUrl === "string"
        ? data.redirectUrl
        : undefined;

  return {
    status: "ok",
    provider: "orange",
    phone,
    amount,
    redirectUrl,
    paymentId: typeof data.payment_token === "string" ? data.payment_token : reference,
    message: redirectUrl ? "payment_request_sent" : "orange_payment_request_started",
  } satisfies Record<string, unknown>;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/pay" && request.method === "POST") {
        try {
          const expectedKey = process.env.VITE_INTERNAL_API_KEY || process.env.INTERNAL_API_KEY;
          const providedKey = request.headers.get("x-internal-key") || "";
          if (!expectedKey || providedKey !== expectedKey) {
            return new Response(JSON.stringify({ error: "unauthorized" }), {
              status: 401,
              headers: { "content-type": "application/json; charset=utf-8" },
            });
          }

          const payload = await request.json();
          const { method, provider, phone, amount, items } = payload as {
            method?: string;
            provider?: string;
            phone?: string;
            amount?: number | string;
            items?: unknown;
          };

          const normalizedMethod = normalizePaymentMethod(method, provider);
          const normalizedAmount = normalizeAmount(amount);

          if (!normalizedMethod || !phone || !normalizedAmount) {
            return new Response(JSON.stringify({ error: "invalid_payload" }), {
              status: 400,
              headers: { "content-type": "application/json; charset=utf-8" },
            });
          }

          if (normalizedMethod === "wave") {
            try {
              const paydunyaSession = await buildPaydunyaCheckoutSession(
                normalizedAmount,
                phone,
                "wave",
              );
              if (paydunyaSession) {
                return new Response(
                  JSON.stringify({
                    status: "ok",
                    provider: "wave",
                    phone,
                    amount: normalizedAmount,
                    redirectUrl: paydunyaSession.redirectUrl,
                    message: paydunyaSession.message,
                    paymentId: paydunyaSession.paymentId,
                    items,
                  }),
                  {
                    status: 200,
                    headers: { "content-type": "application/json; charset=utf-8" },
                  },
                );
              }

              return new Response(
                JSON.stringify({
                  status: "ok",
                  provider: "wave",
                  phone,
                  amount: normalizedAmount,
                  redirectUrl: undefined,
                  message: "payment_request_sent_mock",
                  paymentId: `wave-fallback-${Date.now()}`,
                  items,
                }),
                {
                  status: 200,
                  headers: { "content-type": "application/json; charset=utf-8" },
                },
              );
            } catch (err) {
              console.error("Wave payment error:", err);
              return new Response(
                JSON.stringify({
                  error: err instanceof Error ? err.message : "Wave payment failed",
                }),
                {
                  status: 502,
                  headers: { "content-type": "application/json; charset=utf-8" },
                },
              );
            }
          }

          if (normalizedMethod === "orange") {
            try {
              const paydunyaSession = await buildPaydunyaCheckoutSession(
                normalizedAmount,
                phone,
                "orange",
              );
              if (paydunyaSession) {
                return new Response(
                  JSON.stringify({
                    status: "ok",
                    provider: "orange",
                    phone,
                    amount: normalizedAmount,
                    redirectUrl: paydunyaSession.redirectUrl,
                    message: paydunyaSession.message,
                    paymentId: paydunyaSession.paymentId,
                    items,
                  }),
                  {
                    status: 200,
                    headers: { "content-type": "application/json; charset=utf-8" },
                  },
                );
              }

              return new Response(
                JSON.stringify({
                  status: "ok",
                  provider: "orange",
                  phone,
                  amount: normalizedAmount,
                  redirectUrl: undefined,
                  message: "payment_request_sent_mock",
                  paymentId: `orange-fallback-${Date.now()}`,
                  items,
                }),
                {
                  status: 200,
                  headers: { "content-type": "application/json; charset=utf-8" },
                },
              );
            } catch (err) {
              console.error("Orange payment error:", err);
              return new Response(
                JSON.stringify({
                  error: err instanceof Error ? err.message : "Orange payment failed",
                }),
                {
                  status: 502,
                  headers: { "content-type": "application/json; charset=utf-8" },
                },
              );
            }
          }

          return new Response(JSON.stringify({ error: "unsupported_payment_method" }), {
            status: 400,
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        } catch (err) {
          console.error(err);
          return new Response(JSON.stringify({ error: "bad_request" }), {
            status: 400,
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
