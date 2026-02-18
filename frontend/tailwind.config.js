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
          50: '#f5faff',
          100: '#e0e7ff',
          200: '#b6ccfe',
          300: '#7da6fa',
          400: '#2563eb',
          500: '#1d4ed8',
          600: '#1e40af',
          700: '#1e3a8a',
          800: '#172554',
          900: '#0c1336',
        },
        accent: {
          100: '#fff7ed',
          200: '#ffedd5',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
        },
        success: {
          100: '#f0fdf4',
          500: '#22c55e',
        },
        info: {
          100: '#e0f2fe',
          500: '#0ea5e9',
        },
        danger: {
          100: '#fef2f2',
          500: '#ef4444',
        },
        warning: {
          100: '#fefce8',
          500: '#eab308',
        },
        blue: {
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
        },
        green: {
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
        },
        yellow: {
          100: '#fef9c3',
          400: '#fde047',
          500: '#eab308',
        },
        orange: {
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
        },
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
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
