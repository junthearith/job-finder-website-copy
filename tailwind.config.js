const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/flowbite/**/*.js",
     "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ebf5',
          100: '#cdd7ea',
          150: '#bfd1e7',
          200: '#b3c2e0',
          250: '#a8b8dd',
          300: '#99add6',
          350: '#8ea3d3',
          400: '#8098cc',
          450: '#768ecd',
          500: '#6683c2',
          550: '#5978b7',
          600: '#4c6eb8',
          650: '#4664a3',
          700: '#3259ae',
          750: '#2d4f99',
          800: '#1e429f',
          850: '#1b3d90',
          900: '#17366d',
          950: '#152f5c'
        },
        secondary: {
          50: '#fefefe',
          100: '#fdfdfd',
          150: '#fcfcfc',
          200: '#fbfbfb',
          250: '#fafafa',
          300: '#f9f9f9',
          350: '#f8f8f8',
          400: '#f7f7f7',
          450: '#f6f6f6',
          500: '#f5f5f5',
          550: '#f4f4f4',
          600: '#f3f3f3',
          650: '#f2f2f2',
          700: '#f1f1f1',
          750: '#f0f0f0',
          800: '#efefef',
          850: '#eeeeee',
          900: '#ededed',
          950: '#ececec'
        },
        accent: {
          50: '#fef3e0',
          100: '#fde7c2',
          150: '#fddfb2',
          200: '#fcdba3',
          250: '#fbce85',
          300: '#fac266',
          350: '#f9b848',
          400: '#f8ad29',
          450: '#f7a51a',
          500: '#f69d0c',
          550: '#f4950e',
          600: '#f38c10',
          650: '#f28312',
          700: '#f17a14',
          750: '#f07116',
          800: '#ef6818',
          850: '#ed5f1a',
          900: '#ec561c',
          950: '#eb4d1e'
        }
      },
      fontFamily: {
        suwannaphum: ['Suwannaphum', 'serif'],
        kantumruy: ['"Kantumruy Pro"', 'sans-serif'],  
      },
      fontWeight: {
        hairline: 100,   // Sometimes referred to as 'Thin'
        thin: 200,
        light: 300,
        normal: 400,     // Default font weight
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900  
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },

  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin')
  ],
};