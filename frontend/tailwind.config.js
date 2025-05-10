/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#e3f0ff',
          100: '#b3d4fc',
          200: '#81b8f9',
          300: '#4f9cf6',
          400: '#217ff3',
          500: '#0a65c2',
          600: '#084e97',
          700: '#06376b',
          800: '#03203f',
          900: '#010a14',
        },
        accent: {
          100: '#fff7e6',
          200: '#ffe0b2',
          300: '#ffcc80',
          400: '#ffb74d',
          500: '#ffa726',
        },
        success: {
          100: '#e6f9f0',
          500: '#34d399',
        },
        danger: {
          100: '#ffeaea',
          500: '#ef4444',
        },
      },
      boxShadow: {
        'soft': '0 4px 24px 0 rgba(33,127,243,0.08)',
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};
