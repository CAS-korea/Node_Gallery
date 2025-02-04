// tailwind.config.js (ESM 형식)
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                blob: "blob 7s infinite",
                'fade-in': "fadeInText 1s ease-in"
            },
            keyframes: {
                blob: {
                    "0%": {transform: "translate(0px, 0px) scale(1)"},
                    "33%": {transform: "translate(30px, -50px) scale(1.1)"},
                    "66%": {transform: "translate(-20px, 20px) scale(0.9)"},
                    "100%": {transform: "translate(0px, 0px) scale(1)"}
                },
                fadeInText: {
                    from: {opacity: 0},
                    to: {opacity: 1},
                },
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [typography], // require() 대신 import한 모듈 사용
};