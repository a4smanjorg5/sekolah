const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    safelist: [
        {
            pattern: /(bg|text|border)-[a-z]+-[0-9]+/,
        }
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            lineClamp: {
                7: '7',
            },
            boxShadow: {
                'top': '0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)'
            }
        },
    },

    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/line-clamp')],
};
