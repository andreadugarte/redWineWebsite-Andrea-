import type { Locale } from "@/lib/i18n";

export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  zh: "中文",
};

/** Inline SVG flags (emoji flags don't render on Windows). 3:2 ratio. */
export function Flag({ locale, className = "h-4 w-6" }: { locale: Locale; className?: string }) {
  const common = { viewBox: "0 0 30 20", className: `${className} rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]`, "aria-hidden": true } as const;
  switch (locale) {
    case "es": // Chile
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#fff" />
          <rect y="10" width="30" height="10" fill="#d52b1e" />
          <rect width="10" height="10" fill="#0039a6" />
          <path d="M5 2.2l.9 2.7h2.8l-2.3 1.7.9 2.7L5 7.6 2.7 9.3l.9-2.7L1.3 4.9h2.8z" fill="#fff" />
        </svg>
      );
    case "en": // United Kingdom
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
          <path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" strokeWidth="1.6" />
          <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
          <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="3.4" />
        </svg>
      );
    case "pt": // Brazil
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#009b3a" />
          <path d="M15 2.5L27 10 15 17.5 3 10z" fill="#fedf00" />
          <circle cx="15" cy="10" r="4.4" fill="#002776" />
          <path d="M10.8 9.2c3-1 6.3-.6 8.6 1.1" stroke="#fff" strokeWidth=".8" fill="none" />
        </svg>
      );
    case "zh": // China
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#de2910" />
          <path d="M5 2.5l1.1 3.3h3.4L6.800 7.900l1 3.200L5 9.200 2.200 11.100l1-3.200L.5 5.800h3.400z" fill="#ffde00" />
          <circle cx="11" cy="3.5" r=".9" fill="#ffde00" />
          <circle cx="13" cy="6" r=".9" fill="#ffde00" />
          <circle cx="13" cy="9" r=".9" fill="#ffde00" />
          <circle cx="11" cy="11.500" r=".9" fill="#ffde00" />
        </svg>
      );
  }
}
