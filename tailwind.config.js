/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--exo-2-font)'],
        serif: ['var(--inter-font)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        night: '#101010',
        teal: '#84DCC6',
        gray: '#95A3B3',
        shadow: '#4B4E6D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
