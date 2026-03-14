/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#059669',
        'primary-600': '#059669',
        'primary-500': '#059669',
        'primarylight': 'rgba(5, 150, 105, 0.2)',
        'secondary': '#7C3AED',
        'danger': '#e3342f',
        'bg': '#F8FAFC',
        'card': '#FFFFFF',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': ['14px', '20px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        'h3': ['18px', '28px'],
        'h2': ['24px', '32px'],
        'h1': ['32px', '40px'],
      }
    }
  },
  plugins: ['@tailwindcss/typography']
}
