/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#666666',
        'gray-hover': '#333333',
        blue: '#0033FF',
        'blue-hover': '#0066FF',
      },
    },
  },
  plugins: [],
};
