/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          cccccc: '#CCCCCC',
          666666: '#666666',
          333333: '#333333',
          999999: '#999999',
        },
        blue: {
          '0033ff': '#0033FF',
          '0066ff': '#0066FF',
        },
        red: {
          ff0000: '#FF0000',
          ff6666: '#FF6666',
          cc3333: '#CC3333',
          660000: '#660000',
        },
      },
    },
  },
  plugins: [],
};
