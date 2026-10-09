import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FBFF",
        surface: "#FFFFFF",
        "ice-blue": "#EAF4FF",
        "soft-blue": "#DCEEFF",
        "electric-cyan": "#08D5F5",
        "brand-blue": "#1677FF",
        "dark-navy": "#101C30",
        "primary-text": "#14243A",
        "secondary-text": "#5D6F86",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #F8FBFF 0%, #EAF4FF 100%)",
        "cta-gradient": "linear-gradient(135deg, #101C30 0%, #1677FF 100%)",
      },
      fontFamily: {
        sans: ["var(--font-nohemi)", "sans-serif"],
        nohemi: ["var(--font-nohemi)", "sans-serif"],
        culture: ["var(--font-culture)", "Georgia", "serif"],
        escucha: ["var(--font-escucha)", "sans-serif"],
        flaviotte: ["var(--font-flaviotte)", "serif"],
        serif: ["var(--font-flaviotte)", "var(--font-culture)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
