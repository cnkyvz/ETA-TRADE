/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "990px", // Ekran genişliği 990px'in altında olduğunda bu breakpoint devreye girer
      },
      colors: {
        primary: "#1E40AF", // Özel bir mavi tonu
        secondary: "#9333EA", // Özel bir mor tonu
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Özel yazı tipleri
      },
    },
  },
  plugins: [],
};
