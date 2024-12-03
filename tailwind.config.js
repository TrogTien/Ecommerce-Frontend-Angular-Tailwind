/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      dropShadow: {
        'custom': '0 1px 1px blue'
      },
      boxShadow: {
        'custom': '5px 5px 10px rgba(0, 0, 0, 0.3)'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

