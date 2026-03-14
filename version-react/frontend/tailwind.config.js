/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'codeclic-blue': '#00818a', // Couleur du flyer [cite: 30, 40]
      },
    },
  },
  plugins: [],
}