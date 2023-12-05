/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBG1: "#657bad99",
        customBG2: "#9cedddda",
        customBG3: "#5f5f2cb9",
        customTextBG: "#1194DE",
      },
      backgroundImage: {
        homeBanner: "url('/src/assets/homeBanner.jpg')",
        navbarBG: "url('/src/assets/navbarBG.jpeg')",
      },
      customUtilities: {
        "text-title":
          "font-semibold text-[#eedb0ffe] text-3xl shadow-lg w-fit mx-auto px-5 py-3 rounded-lg",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lemonade", "retro"],
  },
};
