import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  },
  plugins: [react()],
})

// import react from '@vitejs/plugin-react';

// export default {
//     plugins: [react()],
// };
