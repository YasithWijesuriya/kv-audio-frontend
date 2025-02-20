/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F5F5F5',
        secondary: '#A6F1E0',
        accent : "#003092"
      }
    },
  },
  plugins: [],
}