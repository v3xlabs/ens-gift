/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './index.html',
    ],
    theme: {
        extend: {
            screens: {
                xs: '420px',
                md: '801px',
            },
        },
    },
    plugins: [],
};
