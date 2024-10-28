/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#000706',
        brand: {
          300: '#00272D',
          200: '#00272D',
          100: '#0C7E7E',
        },
        cream: {
          200: '#BFAC8B',
          100: '#F2F1EC',
        },
        light: '#E5E5E5',
        delete: '#9B0303',
      },
    },
  },
  plugins: [],
};
