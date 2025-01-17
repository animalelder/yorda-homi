/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#31ba96',
        buttonRed: '#ff5757', 
        primaryLight: '#ecfbf9', 
        primaryBlue: '#278eff',
        deepBlue: '#004aad',
        deepGreen: '#1aa71a',  
      },
    },
  },
  plugins: [],
}
