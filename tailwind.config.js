/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartAnimation: {
          '0%, 100%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.3)' },
          '70%':{transform:'scale(0.9)'},
        },
        scaleAnimation: {
          '0%,100%': {transform:'scale(1)'},
          '50%': {transform:'scale(1.2)'}
        }
      },
      animation:{
        heartAnimation:'heartAnimation 0.3s ease-in-out',
        scaleAnimation:'scaleAnimation 2s ease-in-out infinite' 
      }
    },
  },
  plugins: [],
}

