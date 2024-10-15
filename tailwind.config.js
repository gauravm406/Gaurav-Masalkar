/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,  
  },
  content: [
    "./entrypoints/**/*.{js,jsx,ts,tsx,html}", 
    "./components/**/*.{js,jsx,ts,tsx,html}", 
  ],
  theme: {
    extend: {
       boxShadow: {
        'btn-icon': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)', 
       'generate-response-modal': '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
       'input-inset': '0px 2px 4px 0px rgba(0, 0, 0, 0.06) inset',
      },
       colors: {
        "gray-100": "#DFE1E7",
        'gray-200': '#C1C7D0',       
        'gray-300': '#A4ACB9',        
        'gray-400': '#666D80',   
        "gray-500": "#666D80",
        "blue-500": "#3B82F6"  ,
        "blue-100": "#DBEAFE"
      },
    },
  },
  plugins: [],
};
