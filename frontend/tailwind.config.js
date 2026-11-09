/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',   // ←←← Yeh line add kar do (sirf yeh)
  theme: {
    extend: {},
  },
  plugins: [],
}