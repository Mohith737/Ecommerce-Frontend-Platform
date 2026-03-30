import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use USER from env for production base path (GCS bucket subfolder)
  // Fallback to 'test' to preserve previous behavior if not set
  const user = process.env.USER ?? 'test';
  const basePath = mode === 'production' ? `/${user}/` : '/';

  return {
    plugins: [
      react(),
      tailwindcss(),
      viteSingleFile({
        overrideConfig: {
          base: basePath,
        },
      }),
    ],
    // Use USER-based base path for production builds (GCS bucket subfolder)
    // Use '/' for development server
    base: basePath,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
