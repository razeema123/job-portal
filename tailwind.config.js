 // tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 all your React components
  ],
  theme: {
    extend: {}, // 👈 you can add custom colors, fonts, etc. here
  },
  plugins: [],
}
