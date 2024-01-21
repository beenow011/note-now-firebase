/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      petch: ["Chakra Petch", "sans-serif"]

    },
    extend: {},
  },
  plugins: [],
}

