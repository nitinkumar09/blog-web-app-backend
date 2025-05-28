// import flowbite from "flowbite-react/tailwind"
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     flowbite.content(),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [flowbite.plugin(),
//   require('tailwind-scrollbar',
//     require('@tailwindcss/line-clamp')
//   )],
// }



import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              overflowX: 'auto',
              padding: theme('spacing.8'),
              backgroundColor: theme('colors.gray.900'),
              borderRadius: theme('borderRadius.lg'),
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: 'transparent',
            },
          },
        },
      }),
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'), // ✅ Important for prose support
  ],
};
