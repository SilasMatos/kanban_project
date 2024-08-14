/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackground: '#18181B',
        columnBackground: '#0C0C0C'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
}
