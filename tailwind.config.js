/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['Unitext', 'sans-serif'],
      serif: ['Unitext', 'serif'],
    },

    container: {
      center: true,
    },

    extend: {
      screens: {
        '2xl': '1440px',
      },
      colors: {
        blue: '#00BEFF',
        green: '#00FF7D',
        'light-blue': '#19BEC8',
        'gray-dark': '#152127',
        dark: '#0F161A',
        red: '#991114',
        gray: '#67676E',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
