import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Inter",
          "Segoe UI",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },

      colors: {
        /* ===============================
           CORE SURFACES
           =============================== */
        background: "var(--bg-page)",
        surface: "var(--bg-subtle)",
        hover: "var(--bg-hover)",
        "muted-bg": "var(--bg-muted)",

        /* Elevated layers (for contrast depth) */
        "surface-elevated": "#ffffff",
        "surface-soft": "#f4f7fb",

        /* ===============================
           TEXT HIERARCHY
           =============================== */
        foreground: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        "text-strong": "#0f172a",

        /* ===============================
           BORDERS
           =============================== */
        border: "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        "border-soft": "#e5eaf1",

        /* ===============================
           PRIMARY BRAND (BLUE)
           =============================== */
        primary: "var(--brand)",
        "primary-hover": "var(--brand-hover)",
        "primary-muted": "var(--brand-muted)",

        /* Added stronger depth tones */
        "primary-soft": "#e6f0fa",
        "primary-deep": "#163f6d",

        /* ===============================
           SECONDARY (NAVY / ELECTRICAL)
           =============================== */
        navy: "var(--secondary)",
        "navy-muted": "var(--secondary-muted)",
        "navy-deep": "#2e3142",

        /* ===============================
           ACCENT (GREEN / ENERGY)
           =============================== */
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-soft": "#edfbea",

        /* ===============================
           STATUS
           =============================== */
        success: "var(--success)",
        "success-bg": "var(--success-bg)",
        destructive: "var(--destructive)",
        "destructive-bg": "var(--destructive-bg)",
      },

      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },

      spacing: {
        section: "5rem",
        "section-sm": "3rem",
      },

      boxShadow: {
        soft: "0 8px 24px rgba(0, 0, 0, 0.06)",
        medium: "0 12px 32px rgba(0, 0, 0, 0.08)",
        strong: "0 24px 60px rgba(0, 0, 0, 0.15)",
      },
    },
  },

  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-strong": {
          fontWeight: "700",
          letterSpacing: "-0.01em",
        },
      });
    }),
  ],
};

export default config;


