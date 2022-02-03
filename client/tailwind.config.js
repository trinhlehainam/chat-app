module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                yellow: {
                    custom: '#ffd58c',
                }
            },
            fontFamily: {
                Dalek: 'Dalek',
            },
            animation: {

            },
            keyframes: {

            }
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}
