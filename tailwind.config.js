const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    purge: {
      enabled: false,
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#053017',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      })
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};



