/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFD700',  // Light Orange (Gold)
          DEFAULT: '#FFA500', // Standard Orange
          dark: '#9370DB',   // Dark Orange
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
