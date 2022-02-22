module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2A2A2A',
        secondary_light: '#a3e3ef',
        secondary: '#1ab0c3',
        secondary_dark: '#206f84',
        auth: '#b3372c',
        auth_secondary: '#55012a',
        classes: {
          'class1-left': '#2C3DDB',
          'class1-right': '#EE48E2',
          'class2-left': '#FD8F00',
          'class2-right': '#E4B726',
          'class3-left': '#2031FF',
          'class3-right': '#07B8FA'
        },
        basicColor1: '#6B58E4',
        basicColor2: '#E4587E',
        basicColor3: '#E4D358',
        constru: '#FF7435',
        class: '#D82735',
        method: '#0079e7',
        field: '#009E37',
        implements: '#7D3CB5',
        interface: 'rgb(194, 63, 118)',
        argument: '#996017'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
