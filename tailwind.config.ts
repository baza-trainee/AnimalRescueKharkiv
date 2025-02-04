import { Config } from 'tailwindcss';

const config: Config = {
  content: [

    './pages/**/*.{js,ts,jsx,tsx,mdx}',

    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',

    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    center: true,
    screens: {
      md: '768px',
      lg: '960px',
      xl: '1280px',
      xlr: '1440px',
      '2xl': '1920px',
    },
    extend: {
       boxShadow: {
        statistic: "4px 4px 10px 0 rgba(182, 187, 235, 0.3), -4px -4px 10px 0 rgba(182, 187, 235, 0.3)",
        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightBlue: "#EDEEFA",
        mainBlue: "#4855CC",
        'crm-backgraund':" #f8f9fd",
        'crm-secondary-blue':"#b6bbeb",
        'crm-black':"#070600",
        'color-Id': '#B6BBEB',
      },
    },
  },
  plugins: [],
};

export default config;
