/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        poppins: ["Poppins","sans-serif"]
      },
      backgroundColor:{
        "app-black":"#121212"
      }
      
    },
  },
  plugins: [],
}

