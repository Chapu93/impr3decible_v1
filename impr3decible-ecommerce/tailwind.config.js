/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f97316", // Orange
        "background-light": "#f8fafc", // Cool Gray 50
        "background-dark": "#111827", // Dark Gray
        "surface-light": "#ffffff",
        "surface-dark": "#1f2937", // Gray 800
        "text-light": "#18181b",
        "text-dark": "#f8fafc",
        "text-muted-light": "#71717a", // Zinc 500
        "text-muted-dark": "#9ca3af", // Gray 400
        "border-light": "#e4e4e7", // Zinc 200
        "border-dark": "#374151", // Gray 700
      },
      fontFamily: {
        display: ["Work Sans", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
