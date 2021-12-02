module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2A2A2A',
        secondary: '#DD574B',
        auth: '#b3372c',
        auth_secondary: '#55012a'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
