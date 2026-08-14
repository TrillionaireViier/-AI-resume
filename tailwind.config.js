/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: "#2563eb",
        brandDark: "#0f172a",
        brandLight: "#f8fafc",
      }
    },
  },
  plugins: [],
}
