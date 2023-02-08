/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        parisienne: ["var(--font-parisienne)"],
      },
      colors: {
        primary: "#d1ad6a",
        secondary: "#a2a8a5",
        warn: "#c31313",
        black: "#2d333a",
      },
    },
  },
  plugins: [],
};
