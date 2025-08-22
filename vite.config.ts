import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://karimhammouche.com',
      generateRobotsTxt: false,
    }),
  ],
  optimizeDeps: {
    include: ['three'],
    exclude: [
      'lucide-react',
      'three/webgpu',
      'three/tsl',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      three: path.resolve(__dirname, 'node_modules/three'),
      'frame-ticker': 'scripts/fixes/frame-ticker-patched.js',
      frameTicker: path.resolve(
        __dirname,
        'scripts/fixes/frame-ticker-patched.js',
      ),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
});
