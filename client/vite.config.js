import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: Number(process.env.VITE_FRONTEND_PORT) || 8000,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@server': path.resolve(__dirname, '../server'),
      '@shared': path.resolve(__dirname, '../shared/src')
    }
  },
  build: {
    // Critical optimizations for bundle size reduction
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog'
          ],
          'query-vendor': ['@tanstack/react-query'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': ['axios', 'clsx', 'class-variance-authority', 'tailwind-merge'],
          'icons-vendor': ['lucide-react', 'react-icons']
        }
      }
    },
    // Enable aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn']
      }
    },
    // Disable source maps in production for smaller bundles
    sourcemap: false,
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller output
    target: 'esnext'
  }
});
