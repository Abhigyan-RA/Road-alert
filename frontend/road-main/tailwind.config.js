module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkSkin : '#D6B883',
        text : '#A87B2B'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


