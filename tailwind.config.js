/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#ff4d4f',
        'page-bg': '#f5f5f5',
        'card-bg': '#ffffff',
        'border-color': '#d9d9d9',
        'table-header-bg': '#fafafa',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        'table-stripe': '#fafafa',
      },
      spacing: {
        'page-width': '1200px',
        'sidebar-width': '172px',
        'content-width': '1028px',
        'header-height': '40px',
        'menu-item-height': '40px',
        'form-row-height': '28px',
        'form-item-gap': '36px',
        'table-row-height': '33px',
        'btn-height': '28px',
        'btn-gap': '8px',
        'input-height': '26px',
        'label-width': '64px',
      },
      fontSize: {
        'form': '14px',
      },
      borderRadius: {
        'none': '0',
      },
      minWidth: {
        'page': '1200px',
      },
    },
  },
  plugins: [],
}