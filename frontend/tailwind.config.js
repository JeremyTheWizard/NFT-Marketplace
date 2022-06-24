module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F1D2B",
        buttonPrimary: "#37EF97",
        buttonSecondary: "#1D9DF9",
        hoverButtonSecondary: "#1676BA",
        onPrimary: "#F5F6EE",
      },
      keyframes: {
        slider: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-240px*10))" },
        },
      },
      animation: {
        "auto-slide": "slider 20s linear infinite",
      },
    },
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
  },
  plugins: [require("tailwindcss-filters"), require("flowbite/plugin")],
};
