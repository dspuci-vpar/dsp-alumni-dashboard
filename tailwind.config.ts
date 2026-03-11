
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Neutral palette based on #F2F2F2, #B6B09F, and softer dark tones
        neutral: {
          50: '#F9F9F9',
          100: '#F2F2F2',
          200: '#E5E5E5',
          300: '#D1D1D1',
          400: '#B6B09F',
          500: '#9A9588',
          600: '#7D7A70',
          700: '#5F5D56',
          800: '#3A3935',
          900: '#1F1E1C',
          950: '#151412',
        },
        // Warm beige/cream palette based on #EAE4D5
        cream: {
          50: '#FAF8F4',
          100: '#F5F1E9',
          200: '#EAE4D5',
          300: '#DFD7C1',
          400: '#D4CAAD',
          500: '#C9BD99',
          600: '#B3A67D',
          700: '#8F8563',
          800: '#6B644A',
          900: '#474331',
        },
        // Taupe palette based on #B6B09F
        taupe: {
          50: '#F7F6F4',
          100: '#EFEEE9',
          200: '#DDD9D0',
          300: '#CBC4B7',
          400: '#B6B09F',
          500: '#9D9686',
          600: '#847D6D',
          700: '#6B6454',
          800: '#524B3B',
          900: '#393222',
        },
        // Accent color - subtle warm accent
        accent: {
          DEFAULT: '#B6B09F',
          50: '#F7F6F4',
          100: '#EFEEE9',
          200: '#DDD9D0',
          300: '#CBC4B7',
          400: '#B6B09F',
          500: '#9D9686',
          600: '#847D6D',
          700: '#6B6454',
          800: '#524B3B',
          900: '#393222',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
