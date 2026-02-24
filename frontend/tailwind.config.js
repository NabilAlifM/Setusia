/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FB2C36',
        neutral: {
          50: '#F5F5F5',
          100: '#F5F5F5', // Explicitly mapping for bg usage
          900: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
