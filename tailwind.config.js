/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                yellow: "#fcb900",
                orange: "#ff6900",
                "gray-light": "#9c9999",
                "yellow-bg": "#fff6de",
                "orange-bg": "#fff4f4",
                "gray-bg": "#f3f4f5",
            },
        },
    },
    plugins: [],
};