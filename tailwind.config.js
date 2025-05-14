/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spring: "#AA4A79",
        "bg-spring": "#F6F1F5",
      },
    },
  },
  plugins: [],
};
