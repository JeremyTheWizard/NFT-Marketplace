module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F1D2B",
        "button-primary": "#37EF97",
        "button-secondary": "1D9DF9",
      },
      keyframes: {
        slider: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-160px*9))" },
        },
      },
      animation: {
        "auto-slide": "slider 25s linear infinite",
      },
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
  },
  plugins: [require("tailwindcss-filters")],
};
