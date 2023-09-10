/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const { fontFamily } = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/pages/**/index.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
        secondary: ['Montserrat', ...fontFamily.sans],
        header: ['Poppins', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(37 99 235)',
          100: 'rgb(59 130 246)',
        },
        grey: {
          DEFAULT: 'rgb(156 163 175)',
          400: 'rgb(156 163 175)',
          500: 'rgb(107 114 128)',
        }
      }
    },
  },
  plugins: [],
}

