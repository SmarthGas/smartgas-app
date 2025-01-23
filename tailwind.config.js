/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      dark: '#000706',
      brand: {
        400: '#002126',
        300: '#00272D',
        200: '#00272D',
        100: '#0C7E7E',
      },
      cream: {
        200: '#BFAC8B',
        100: '#F2F1EC',
      },
      grey: {
        200: '#808080',
        100: '#F2F2F2',
      },
      light: '#E5E5E5',
      delete: '#9B0303',
    },
    spacing: {
      12.5: '3.125rem',
      18: '4.5rem',
    },
  },
};
export const plugins = [];
