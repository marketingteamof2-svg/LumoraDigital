import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: "hsl(var(--success))",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale (360px → 1440px)
        "fluid-sm": ["clamp(0.875rem, 0.85rem + 0.1vw, 0.95rem)", { lineHeight: "1.5" }],
        "fluid-base": ["clamp(1rem, 0.96rem + 0.2vw, 1.125rem)", { lineHeight: "1.65" }],
        "fluid-lg": ["clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", { lineHeight: "1.55" }],
        "fluid-xl": ["clamp(1.5rem, 1.3rem + 0.9vw, 2.125rem)", { lineHeight: "1.2" }],
        "fluid-2xl": ["clamp(1.875rem, 1.5rem + 1.7vw, 3rem)", { lineHeight: "1.1" }],
        "fluid-3xl": ["clamp(2.25rem, 1.6rem + 3vw, 4.25rem)", { lineHeight: "1.04" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(16 16 32 / 0.04), 0 8px 24px -8px rgb(16 16 32 / 0.10)",
        glow: "0 10px 40px -10px hsl(var(--primary) / 0.45)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, typography],
};

export default config;
