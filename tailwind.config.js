/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/pages/**/index.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

