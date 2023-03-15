/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.*'
  ],
  theme: {
    minWidth: {
      '2/5': '40%',
      '1/4': '25%'
    },
    extend: {},
  },
  plugins: [],
}
