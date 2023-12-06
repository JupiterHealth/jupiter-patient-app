// const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    media: false, // or 'media' or 'class'
    theme: {
        container: {
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "3rem",
                xl: "4rem",
                "2xl": "5rem",
            },
        },
        extend: {
            colors: {
                // ...colors,
                transparent: "transparent",
                current: "currentColor",
                primary: "#AD3BB4",
                secondary: "#3979C3",
                danger: "#FF5767",
                deactivate: "#FF0002",
                warning: "#FFDD55",
                success: "#2CBB52",
                pink: "#D9139C",
                "grey-100": "#F9F9F9",
                "grey-200": "#2626261A",
                "grey-300": "#717171",
                "grey-400": "#7D7D7D",
                "grey-500": "#7A7A7A",
                "grey-600": "#C0BFBD",
                "grey-800": "#4A4646",
                "input-bg": "#fcfcfd",
                "input-border": "#C8CCCF",
                "light-black": "#3a3a3a",
                "light-bg": "#E9E9E9",
            },
            fontSize: {
                x: "0.625", // 10px
                xs: "0.75rem", // Extra Small
                sm: "0.875rem", // Small
                base: "1rem", // Base (default)
                lg: "1.125rem", // Large
                xl: "1.25rem", // Extra Large
                "2xl": "1.5rem", // 2X Large
                "3xl": "1.875rem", // 2X Large
                "4xl": "2.25rem", // 2X Large
                // Add more custom font sizes as needed
            },
        },
    },
    plugins: [],
};
