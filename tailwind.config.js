/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#155E41',
          50: '#E9F1EE',
          100: '#D3E3DD',
          200: '#A7C7BB',
          300: '#7BAB99',
          400: '#4F8F77',
          500: '#155E41',
          600: '#114B34',
          700: '#0D3827',
          800: '#09251A',
          900: '#05130D',
        },
        background: {
          DEFAULT: '#E9F1EE',
          box: '#FBFBFB',
        },
      },
      fontFamily: {
        sans: ['Gilroy', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'custom': '10px 10px 54px 0px rgba(21, 94, 65, 0.15), -10px 10px 54px 0px rgba(21, 94, 65, 0.15)',
      },
    },
  },
  plugins: [],
};