/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        './resources/**/*.blade.php',
        './resources/js/react/**/*.{js,jsx,ts,tsx}',
        './resources/js/react/pages/*.{js,jsx,ts,tsx}',
        './resources/js/react/layouts/*.{js,jsx,ts,tsx}',
        './resources/js/react/components/layout/*.{js,jsx,ts,tsx}',
        './resources/js/react/components/shared/*.{js,jsx,ts,tsx}',
        './resources/js/react/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
