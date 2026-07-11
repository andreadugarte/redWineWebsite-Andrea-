"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { type Locale, localeFromPath, t as translate } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

/**
 * Derives the active locale from the URL (`/es...` → es) and exposes it to
 * client components via context, so shared chrome (header, cards, footer)
 * translates itself without prop-threading. Also keeps <html lang> in sync.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Returns a translator bound to the current locale: `const tr = useT(); tr("nav.wines")`. */
export function useT(): (key: string) => string {
  const locale = useContext(LocaleContext);
  return (key: string) => translate(key, locale);
}
