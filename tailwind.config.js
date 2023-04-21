const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      // slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      // stone: colors.stone,
      red: colors.red,
      // orange: colors.orange,
      // amber: colors.amber,
      // yellow: colors.yellow,
      // lime: colors.lime,
      // green: colors.green,
      // emerald: colors.emerald,
      // teal: colors.teal,
      // cyan: colors.cyan,
      // sky: colors.sky,
      blue: colors.blue,
      // indigo: colors.indigo,
      // violet: colors.violet,
      // purple: colors.purple,
      // fuchsia: colors.fuchsia,
      // pink: colors.pink,
      // rose: colors.rose,
    },
    extend: {
      borderRadius: {
        '2.5xl': '20px',
      },
      fontFamily: {
        'pt-sans': ['PT Sans', 'sans-serif'],
        bitter: ['Bitter', 'sans-serif'],
        poppins: ['Poppins', 'arial', 'sans-serif'],
      },
      colors: {
        zinc: {
          700: '#454749',
          900: '#2E3032',
        },
        blue: {
          700: '#1651B0',
          800: '#0074A9',
        },
        yellow: {
          700: '#FFCB06',
        },
        red: {
          700: '#AA2A33',
          500: '#E40000',
        },
        neutral: {
          600: '#575757',
          700: '#444444',
        },
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: ['@tailwindcss/forms', '@tailwindcss/typography'],
};
