import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Wine-heritage palette — warm, muted, earthy
        oxblood: {
          DEFAULT: "#5a1420",
          deep: "#3d0d16",
          soft: "#7a2231",
        },
        bordeaux: "#6b1e2b",
        charcoal: {
          DEFAULT: "#26221f",
          soft: "#3a3430",
        },
        bone: {
          DEFAULT: "#f4efe6",
          warm: "#ece4d6",
          deep: "#e2d7c3",
        },
        gold: {
          DEFAULT: "#b08d4f",
          soft: "#c7a86e",
          pale: "#e3d2a8",
        },
        vine: "#4a5a3c",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
