import { defineConfig } from 'vitest/config';

export default defineConfig({
    build: {
        emptyOutDir: true,
        lib: {
            entry: 'src/index.js',
            name: '_',
        },
        minify: false,
        outDir: 'dist',
        rolldownOptions: {
            output: [
                {
                    entryFileNames: 'frost-core.js',
                    format: 'umd',
                    minify: false,
                    name: '_',
                },
                {
                    entryFileNames: 'frost-core.min.js',
                    format: 'umd',
                    minify: true,
                    name: '_',
                },
                {
                    entryFileNames: 'frost-core.esm.js',
                    format: 'es',
                    minify: false,
                },
                {
                    entryFileNames: 'frost-core.esm.min.js',
                    format: 'es',
                    minify: true,
                },
            ],
        },
        sourcemap: true,
        target: 'baseline-widely-available',
    },
    test: {
        allowOnly: false,
        coverage: {
            include: ['src/**/*.js'],
            reporter: ['text', 'lcov'],
        },
    },
});
