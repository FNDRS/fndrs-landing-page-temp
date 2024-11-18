import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Jost", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        "primary-black": "#131313"
      },
      letterSpacing: {
        separated: "0.35px"
      },
      screens: {
        xs: "480px"
      }
    }
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none"
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ]
}
