import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const ENV = loadEnv('development', process.cwd(), '');

const proxyToBackendSettings = {
  target: ENV.VITE_DATA_ENDPOINT,
  changeOrigin: true,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/file': proxyToBackendSettings,
      '/fs': proxyToBackendSettings,
      '/api': {
        ...proxyToBackendSettings,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
