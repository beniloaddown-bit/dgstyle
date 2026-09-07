import React from "react";

type WhatsAppButtonProps = {
  phoneNumber?: string;
  message?: string;
  label?: string;
  className?: string;
};

const DEFAULT_PHONE_NUMBER = "221774991779";

export default function WhatsAppButton({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  message = "Bonjour, j'aimerais discuter de ce produit.",
  label = "Discuter sur WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  const cleanedPhone = phoneNumber.replace(/\s+/g, "").replace(/^\+/, "");
  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${cleanedPhone}?text=${encoded}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Discuter sur WhatsApp avec DG Style au ${phoneNumber}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-sm font-medium transition-colors hover:bg-muted ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.373 0 .01 5.373 0 12c0 2.116.554 4.182 1.606 6.02L0 24l6.21-1.64A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.248-6.297-3.48-8.52z" fill="#25D366"/>
        <path d="M17.472 14.382c-.297-.148-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.149-.198.297-.768.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.52-.075-.148-.672-1.616-.92-2.214-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487 1.775.765 2.98.612 3.26.572.099-.023.297-.148.42-.297.124-.149.414-.485.594-.742.182-.256.362-.223.64-.134.277.09 1.758.82 2.062.969.304.148.51.223.586.347.074.123.074.449.05.617-.025.166-.297.52-.672.793-.377.272-2.222 1.35-4.49 1.35-2.268 0-3.992-.741-5.42-1.69-1.428-.949-2.38-2.216-2.658-2.676-.278-.46-.03-.708.198-.857.203-.13.446-.347.668-.52.222-.173.296-.297.445-.495.148-.198.074-.372-.037-.52-.112-.148-1.002-1.323-1.371-1.797-.37-.475-.742-.41-1.026-.409-.283.002-.604.01-.923.01-.32 0-.84.116-1.28.558-.437.443-1.18 1.157-1.18 2.812 0 1.655.945 3.254 1.078 3.485.133.232 1.864 2.91 4.82 4.2 2.955 1.29 4.422.98 5.215.917.793-.064 2.445-.998 2.792-1.973.348-.976.348-1.81.243-1.973-.105-.164-.264-.256-.561-.404z" fill="#fff"/>
      </svg>
      {label}
    </a>
  );
}
