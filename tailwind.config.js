/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-primary": "#202123",
        "dark-secondary": "#333333",
        "blue-primary": "#007DC6",
        "blue-secondary": "#75BAE0",
        background: "#F4F4F4",
        "light-mode-black-600": "#666666",
      },
    },
  },
  plugins: [],
};
