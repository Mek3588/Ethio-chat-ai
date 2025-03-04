/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'eth-green': '#078930',
        'eth-yellow': '#FCDD09',
        'eth-red': '#DA121A',
      },
      fontFamily: {
        nyala: ['Nyala', 'serif'],
      },
      backgroundImage: {
        'eth-pattern': "url('https://i.imgur.com/XVWJj2F.png')",
      },
    },
  },
  plugins: [],
};