import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Plumpton brand palette (consultancy brand pack, Jul 2026) — dark green is the
        // primary accent, replacing the old burgundy/oxblood. Token names (oxblood/gold/
        // vine/bone) are kept as-is to avoid touching every call site; see DEPENDENCIES.md.
        oxblood: {
          DEFAULT: "#0f6343", // Plumpton dark green — primary accent
          deep: "#0a4a32",
          soft: "#3d8265",
        },
        bordeaux: "#e84848", // Plumpton red-coral — reserved for selective emphasis only
        charcoal: {
          DEFAULT: "#26221f",
          soft: "#3a3430",
        },
        bone: {
          DEFAULT: "#feefd1", // Plumpton cream-beige — main secondary
          warm: "#f7e2b8",
          deep: "#d1d5ce", // Plumpton grey-sage — contrast secondary
        },
        gold: {
          DEFAULT: "#fec425", // Plumpton yellow — highlight color. Only ever use on dark
          // (oxblood/oxblood-deep/charcoal) backgrounds — on cream/bone it fails contrast
          // (1.41:1, needs 4.5:1). Use `gold-deep` for text/rings on light backgrounds.
          soft: "#f6d777",
          pale: "#fbe9b8",
          deep: "#8a6100", // darkened for AA-legible gold text/focus rings on bone/bone-warm
        },
        vine: "#3d8265",
        blush: "#ecc7c2", // Plumpton pink-blush — secondary contrast background
      },
      fontFamily: {
        // Brand pack fonts are commercial (Bookmania, Knockout Welterweight, Coco Gothic)
        // and no licensed files are available; using the closest free equivalents.
        // See DEPENDENCIES.md for the substitution note.
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        condensed: ["var(--font-oswald)", "Impact", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05" }],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-2%, 1%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
