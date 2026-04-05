/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#f5f5f6",
          100: "#e6e6e7",
          200: "#d0d0d2",
          300: "#afb0b3",
          400: "#87888c",
          500: "#6c6d71",
          600: "#5c5d60",
          700: "#3a3b3e",
          800: "#22232a",
          900: "#15161b",
          950: "#0b0c10",
        },
        accent: {
          blue: "#6366f1",
          purple: "#8b5cf6",
          pink: "#ec4899",
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.03em",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
        "glow-lg": "0 0 40px rgba(99, 102, 241, 0.2)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.15)",
        "inset-border": "inset 0 0 0 1px rgba(255, 255, 255, 0.06)",
        "inset-border-light": "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
        card: "0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.05)",
        "card-hover":
          "0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, rgba(99,102,241,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6,182,212,0.04) 0px, transparent 50%)",
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-in": "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(-4px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(99, 102, 241, 0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
