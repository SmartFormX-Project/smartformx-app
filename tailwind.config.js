import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      // "bg-mobile": 'url("/assets/images/bg-sidebar-mobile.svg")',
      // "bg-desktop": 'url("/assets/images/bg-sidebar-desktop.svg")',
    },
    colors: {
      "marine-blue": "hsl(213, 96%, 18%)",
      "purplish-blue": "hsl(243, 100%, 62%)",
      "pastel-blue": "hsl(228, 100%, 84%)",
      "light-blue": "hsl(206, 94%, 87%)",
      "lighter-blue": "rgba(191, 226, 253, .2)",
      "strawberry-red": "hsl(354, 84%, 57%)",
      "cool-gray": "hsl(231, 11%, 63%)",
      "light-gray": "hsl(229, 24%, 87%)",
      magnolia: "hsl(217, 100%, 97%)",
      alabaster: "hsl(231, 100%, 99%)",
    },
    animation: {
      // Fade up and down
      "fade-up": "fade-up 0.5s",
      "fade-down": "fade-down 0.5s",
      // Tooltip
      "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    keyframes: {
      // Fade up and down
      "fade-up": {
        "0%": {
          opacity: 0,
          transform: "translateY(10px)",
        },
        "80%": {
          opacity: 0.6,
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0px)",
        },
      },
      "fade-down": {
        "0%": {
          opacity: 0,
          transform: "translateY(-10px)",
        },
        "80%": {
          opacity: 0.6,
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0px)",
        },
      },
      // Tooltip
      "slide-up-fade": {
        "0%": { opacity: 0, transform: "translateY(6px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      "slide-down-fade": {
        "0%": { opacity: 0, transform: "translateY(-6px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
  },
};
export const darkMode = "class";
export const plugins = [nextui()];
