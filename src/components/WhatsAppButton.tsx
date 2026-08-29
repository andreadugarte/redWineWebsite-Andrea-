"use client";

import { SITE } from "@/lib/site";
import { useT } from "@/components/i18n/LocaleProvider";

/** Site-wide floating WhatsApp entry point, per Rodrigo's confirmed go-ahead. */
export function WhatsAppButton() {
  const tr = useT();
  const label = tr("common.chatWhatsapp");

  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7" fill="currentColor">
        <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.393.669 4.63 1.828 6.54L3 29l7.147-2.284A12.44 12.44 0 0 0 16.001 28C22.905 28 28.5 22.404 28.5 15.5S22.905 3 16.001 3Zm0 22.75c-2.02 0-3.9-.573-5.499-1.564l-.395-.243-4.24 1.355 1.379-4.132-.257-.412a10.19 10.19 0 0 1-1.739-5.754c0-5.66 4.59-10.25 10.25-10.25s10.25 4.59 10.25 10.25-4.59 10.25-10.25 10.25Zm5.62-7.66c-.308-.154-1.82-.898-2.102-1-.282-.103-.487-.154-.692.154-.205.308-.795 1-.975 1.205-.18.205-.359.231-.667.077-.308-.154-1.301-.48-2.478-1.529-.916-.817-1.535-1.826-1.715-2.134-.18-.308-.02-.474.135-.627.138-.138.308-.36.462-.539.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.67-.949-2.286-.25-.6-.503-.519-.692-.528l-.59-.01c-.205 0-.539.077-.821.385s-1.077 1.052-1.077 2.566 1.103 2.977 1.257 3.183c.154.205 2.171 3.317 5.26 4.652.735.317 1.308.507 1.755.649.737.234 1.409.201 1.939.122.591-.088 1.82-.744 2.077-1.462.257-.718.257-1.333.18-1.462-.077-.128-.282-.205-.59-.36Z" />
      </svg>
    </a>
  );
}
