import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1fbf5",
          100: "#dbf6e5",
          200: "#b8edcc",
          300: "#84deb0",
          400: "#4ecb8f",
          500: "#23b773",
          600: "#16935b",
          700: "#13754a",
          800: "#125c3d",
          900: "#0f4c34",
          950: "#072a1e",
        },
      },
    },
  },
  plugins: [],
};

export default config;
