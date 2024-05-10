/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],

  theme: {
    extend: {
      dropShadow: {
        'drop': [
          '0 35px 35px rgba(0, 0, 0, 0.50)']
      }
    },
  },
  plugins: [],
}

