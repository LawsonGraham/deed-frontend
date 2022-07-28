/* tailwind.config.js */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      margin: {
        default: '7%'
      },
      height: theme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      colors: {
        'bgHeader': '#cbd5e1',
        'bgSubsection': '#fafafa',
        'bgPageDefault': 'white',
        'fontBG': '#a1a1aa'
      },
    },
  },
  plugins: [],
};
