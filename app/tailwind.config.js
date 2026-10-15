/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./config/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.css",
    // Class names that exist only in platform UI still need to be generated.
    "../platforms/src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "media",
  prefix: "",
  important: false,
  safelist: ["shadow-background-5"],
  theme: {
    screens: {
      sm: "40rem", // 640px
      md: "48rem", // 768px
      lg: "64rem", // 1024px
      xl: "80rem", // 1280px
      "2xl": "96rem", // 1536px
    },
    fontFamily: {
      body: ["var(--font-body)"],
      heading: ["var(--font-heading)"],
      alt: ["var(--font-alt)"],
    },
    // Line-height is 150% for text sizes and 100% for display sizes.
    fontSize: {
      xs: ["12px", "1.5em"],
      sm: ["14px", "1.5em"],
      base: ["16px", "1.5em"],
      lg: ["18px", "1.5em"],
      xl: ["20px", "1.5em"],
      "2xl": ["24px", "1.5em"],
      "3xl": ["32px", "1.5em"],
      "4xl": ["36px", "1.5em"],
      "5xl": ["40px", "1.5em"],
      "6xl": ["64px", "1em"],
      "7xl": ["80px", "1em"],
    },
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        "background-1": "rgb(var(--color-background-1) / <alpha-value>)",
        "background-2": "rgb(var(--color-background-2) / <alpha-value>)",
        "background-3": "rgb(var(--color-background-3) / <alpha-value>)",
        "background-4": "rgb(var(--color-background-4) / <alpha-value>)",
        "background-5": "rgb(var(--color-background-5) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        "foreground-2": "rgb(var(--color-foreground-2) / <alpha-value>)",
        "foreground-3": "rgb(var(--color-foreground-3) / <alpha-value>)",
        "foreground-4": "rgb(var(--color-foreground-4) / <alpha-value>)",
        "foreground-5": "rgb(var(--color-foreground-5) / <alpha-value>)",
        "foreground-6": "rgb(var(--color-foreground-6) / <alpha-value>)",
        "foreground-7": "rgb(var(--color-foreground-7) / <alpha-value>)",
        focus: "rgb(var(--color-focus) / <alpha-value>)",
        "color-1": "rgb(var(--color-text-1) / <alpha-value>)",
        "color-2": "rgb(var(--color-text-2) / <alpha-value>)",
        "color-3": "rgb(var(--color-text-3) / <alpha-value>)",
        "color-4": "rgb(var(--color-text-4) / <alpha-value>)",
        "color-5": "rgb(var(--color-text-5) / <alpha-value>)",
        "color-6": "rgb(var(--color-text-6) / <alpha-value>)",
        "color-7": "rgb(var(--color-text-7) / <alpha-value>)",
        "color-8": "rgb(var(--color-text-8) / <alpha-value>)",
        "color-9": "rgb(var(--color-text-9) / <alpha-value>)",
        "color-10": "rgb(var(--color-text-10) / <alpha-value>)",
        "customization-background-1": "rgb(var(--color-customization-background-1) / <alpha-value>)",
        "customization-background-2": "rgb(var(--color-customization-background-2) / <alpha-value>)",
        "customization-background-3": "rgb(var(--color-customization-background-3) / <alpha-value>)",
        "customization-foreground-1": "rgb(var(--color-customization-foreground-1) / <alpha-value>)",
        "customization-foreground-2": "rgb(var(--color-customization-foreground-2) / <alpha-value>)",
        accent: "#000",
        "accent-2": "#000",
        "accent-3": "#000",
        muted: "#000",
        "gray-400": "#000",
      },
      spacing: {},
      backgroundImage: {
        "passport-gradient-header": "radial-gradient(ellipse 100vw 900px at 50% 50%, #fff, #E5E5E5)",
        "passport-gradient-dashboard-cta": "radial-gradient(ellipse 100vw 900px at 50% -32px, #fff, #E5E5E5)",
      },
      backgroundSize: {
        "size-200": "200% 200%",
        "size-400": "400%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      minHeight: {
        default: "100vh",
      },
      boxShadow: {
        "even-md": "0 0 12px",
        "even-lg": "0 0 16px",
      },
      dropShadow: {
        text: "2px 2px 1px #000000",
      },
      keyframes: {
        "visible-at-one-third": {
          "0%": { opacity: "0" },
          "33%": { opacity: "1" },
        },
        "visible-at-two-thirds": {
          "0%": { opacity: "0" },
          "66%": { opacity: "1" },
        },
        "loading-gradient": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      animation: {},
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("tailwind-gradient-mask-image")],
};

module.exports = config;
