import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        {
            name: 'load-svg',
            enforce: 'pre',
            transform(_, id) {
                if (id.endsWith('.svg')) {
                    return 'export default () => {}';
                }
            },
        },
    ],
    test: {
        globals: true,
        environment: 'jsdom',
    },
});
