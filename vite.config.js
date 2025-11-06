import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isSiteBuild = mode === 'site'

  const commonConfig = {
    plugins: [
      react({
        // Only enable Babel when building the library bundle
        babel:
          command === 'build' && !isSiteBuild
            ? {
                babelrc: true,
                configFile: true,
              }
            : false,
        // Make sure React plugin handles JSX in both .js and .jsx files
        include: /\.(jsx?|tsx?)$/,
      }),
      eslint({
        lintOnStart: false,
        failOnError: false,
      }),
    ],
    publicDir: 'public',
    esbuild: {
      jsx: 'automatic', // Handle JSX in .js files
      jsxDev: true,
    },
    resolve: {
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: false,
    },
    base: isSiteBuild ? '/react-image-annotate/' : '/',
  }

  if (isSiteBuild) {
    return {
      ...commonConfig,
      build: {
        outDir: 'dist',
        sourcemap: true,
        target: 'es2015',
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, 'index.html'),
        },
      },
    }
  }

  return {
    ...commonConfig,
    build: {
      lib: {
        entry: resolve(__dirname, 'src/lib.js'),
        name: 'ReactImageAnnotate',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          '@emotion/react',
          '@emotion/styled',
          '@mui/material',
          '@mui/icons-material',
          '@mui/styles',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
      },
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
      target: 'es2015',
      emptyOutDir: true,
    },
  }
})
