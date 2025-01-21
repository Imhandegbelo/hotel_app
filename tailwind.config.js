/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        Montserrat: ["Montserrat","sans-serif"],
        Grotesk: ["Space Grotesk","sans-serif"],
      }
    },
    colors:{
      primary: '#ed1b24',
      black: colors.black,
      white: colors.white,
      gray: colors.gray
    }
  },
  plugins: [],
};
