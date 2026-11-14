/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff385c',
        'primary-active': '#e00b41',
        'primary-disabled': '#ffd1da',
        canvas: '#ffffff',
        'surface-soft': '#f7f7f7',
        'surface-strong': '#f2f2f2',
        hairline: '#dddddd',
        'hairline-soft': '#ebebeb',
        'border-strong': '#c1c1c1',
        ink: '#222222',
        body: '#3f3f3f',
        muted: '#6a6a6a',
        'muted-soft': '#929292',
        error: '#c13515',
        'error-hover': '#b32505',
        'legal-link': '#428bff',
        bg: '#ffffff',
        card: '#ffffff',
        'text-primary': '#222222',
        'text-secondary': '#6a6a6a',
      },
      fontFamily: {
        sans: ['"Airbnb Cereal VF"', 'Circular', 'Inter', '-apple-system', 'system-ui', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        xs: ['13px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['16px', '20px'],
        xl: ['20px', '24px'],
        h3: ['20px', '24px'],
        h2: ['21px', '30px'],
        h1: ['28px', '40px'],
        display: ['64px', '70px'],
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        xl: '32px',
      },
      boxShadow: {
        float: 'rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px, rgba(0, 0, 0, 0.1) 0 4px 8px',
      },
      maxWidth: {
        content: '1280px',
        article: '1080px',
      },
    },
  },
  plugins: [],
};
