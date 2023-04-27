/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Roboto Condensed', 'serif'],
    },
    screens: {
      xs: { min: '0px', max: '370px' },
      sm: { min: '371px', max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px' },
    },
  },
  plugins: [],
};
