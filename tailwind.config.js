/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#053017',
        'primary-500': '#085429',
        'primarylight': 'rgba(25,238,118,0.78)',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      }
  }},
  plugins: ['@tailwindcss/typography']
}
