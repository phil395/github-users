import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/assets/styles/index.ts'),
      '@components': path.resolve(__dirname, './src/components/index.ts'),
      '@charts': path.resolve(__dirname, './src/components/charts/index.ts'),
      '@hooks': path.resolve(__dirname, './src/hooks/index.ts'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages/index.ts'),
      '@store': path.resolve(__dirname, './src/store/index.ts'),
      '@services': path.resolve(__dirname, './src/services/index.ts'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
    },
  }
});
