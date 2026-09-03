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

async function buildWaveCheckoutSession(amount: number, phone: string) {
  const apiKey = process.env.WAVE_API_KEY || process.env.VITE_WAVE_API_KEY;
  const baseUrl = (process.env.WAVE_API_BASE || "https://api.wave.com").replace(/\/$/, "");
  const successUrl = process.env.WAVE_SUCCESS_URL || "http://localhost:5173/paiement?status=success";
  const errorUrl = process.env.WAVE_ERROR_URL || "http://localhost:5173/paiement?status=error";

  if (!apiKey) {
    return {
      status: "mocked",
      provider: "wave",
      phone,
      amount,
      message: "payment_request_sent_mock",
    } satisfies Record<string, unknown>;
  }

  const response = await fetch(`${baseUrl}/v1/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(amount),
      currency: "XOF",
      client_reference: `dgstyle-${Date.now()}`,
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
              const waveSession = await buildWaveCheckoutSession(normalizedAmount, phone);
              return new Response(JSON.stringify({
                status: "ok",
                provider: "wave",
                phone,
                amount: normalizedAmount,
                redirectUrl: waveSession.redirectUrl,
                message: waveSession.message,
                paymentId: waveSession.paymentId,
                items,
              }), {
                status: 200,
                headers: { "content-type": "application/json; charset=utf-8" },
              });
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
            const orangeBase = process.env.ORANGE_API_BASE;
            const orangeClientId = process.env.ORANGE_CLIENT_ID;
            const orangeClientSecret = process.env.ORANGE_CLIENT_SECRET;
            const orangeMerchantId = process.env.ORANGE_MERCHANT_ID;

            if (!orangeBase || !orangeClientId || !orangeClientSecret || !orangeMerchantId) {
              return new Response(
                JSON.stringify({
                  error:
                    "Orange Money API non configurée. Ajoutez ORANGE_API_BASE, ORANGE_CLIENT_ID, ORANGE_CLIENT_SECRET et ORANGE_MERCHANT_ID.",
                }),
                {
                  status: 503,
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
                message: "orange_payment_request_started",
                items,
              }),
              {
                status: 200,
                headers: { "content-type": "application/json; charset=utf-8" },
              },
            );
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
