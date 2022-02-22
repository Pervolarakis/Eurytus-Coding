module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2A2A2A',
        secondary: '#DD574B',
        auth: '#ff4b2b',
        classes: {
          'class1-left': '#2C3DDB',
          'class1-right': '#EE48E2',
          'class2-left': '#FD8F00',
          'class2-right': '#E4B726',
          'class3-left': '#2031FF',
          'class3-right': '#07B8FA'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
