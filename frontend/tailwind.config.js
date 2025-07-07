/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
