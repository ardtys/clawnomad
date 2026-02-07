import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lime: {
          50: "#f0fdf0",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        terminal: {
          dark: "#0a0a0f",
          darker: "#050508",
          border: "#1a1a2e",
          glow: "#39ff14",
          muted: "#6b7280",
        },
        web2: "#3b82f6",
        web3: "#8b5cf6",
        moltworld: "#22c55e",
        success: "#22c55e",
        pending: "#f59e0b",
        intercepted: "#ef4444",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "Fira Code", "monospace"],
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(57, 255, 20, 0.3)",
        "glow-lg": "0 0 40px rgba(57, 255, 20, 0.4)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        travel: "travel 0.5s ease-out",
        "scan-line": "scan-line 8s linear infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(57, 255, 20, 0.3)",
            borderColor: "rgba(57, 255, 20, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(57, 255, 20, 0.6)",
            borderColor: "rgba(57, 255, 20, 0.8)",
          },
        },
        travel: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
