/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/**/*.{html,ejs}"],

  theme: {
    extend: {
      backgroundImage: {
        "wave": "url('/imgs/wave.svg')"
      }
    },
  },
  plugins: [],
}

