/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          default: '#0a91b1',
          dark: '#0d7490',
        },
        white: '#fff',
        black: '#212529',
        error: '#ff3648',
        success: '#03c7b4',
        disabled: '#CCCCCC',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
