/// <reference types="vitest" />
/// <reference types="vite/client" />

import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	const API_BASE_URL = process.env.VITE_API_BASE_URL

	return {
		plugins: [
			devtools(),
			tsconfigPaths({ projects: ['./tsconfig.json'] }),
			tailwindcss(),
			tanstackRouter({ target: 'react', autoCodeSplitting: true }),
			viteReact()
		],
		server: {
			host: true,
			proxy: {
				'/storage': {
					target: API_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path
				}
			}
		},
		build: {
			emptyOutDir: true,
			sourcemap: true,
			cssCodeSplit: true,
			reportCompressedSize: false,
			chunkSizeWarningLimit: 500,
			assetsInlineLimit: 4096, // Inline files < 4KB
			rolldownOptions: {
				transform: { dropLabels: ['DEV', 'DEBUG'] },
				logLevel: mode === 'production' ? 'silent' : 'debug',
				output: {
					codeSplitting: {
						groups: [
							{ name: '@dnd-kit', test: /@dnd-kit/ },
							{ name: '@base-ui/react', test: /@base-ui\/react/ },
							{ name: '@tanstack/react-query', test: /@tanstack\/react-query/ },
							{ name: '@tanstack/react-router', test: /@tanstack\/react-router/ },
							{ name: '@tanstack/react-table', test: /@tanstack\/react-table/ },
							// { name: '@tanstack/react-virtual', test: /@tanstack\/react-virtual/ },
							{ name: 'ahooks', test: /ahooks/ },
							{ name: 'axios', test: /axios/ },
							{ name: 'clsx', test: /clsx/ },
							// { name: 'cmdk', test: /cmdk/ },
							{ name: 'd3-shape', test: /d3-shape/ },
							// { name: 'date-fns', test: /date-fns/ },
							// { name: 'file-saver', test: /file-saver/ },
							// { name: 'filesize', test: /filesize/ },
							{ name: 'flat', test: /flat/ },

							{ name: 'immer', test: /immer/ },
							{ name: 'lodash-es', test: /lodash-es/ },
							{ name: '@hugeicons/core-free-icons', test: /@hugeicons\/core-free-icons/ },
							{ name: '@hugeicons/react', test: /@hugeicons\/react/ },
							{ name: 'lz-string', test: /lz-string/ },
							{ name: 'qs', test: /qs/ },
							{ name: 'react-day-picker', test: /react-day-picker/ },
							// { name: 'recharts', test: /recharts/ },
							{ name: 'sonner', test: /sonner/ },
							{ name: 'tailwind-merge', test: /tailwind-merge/ },
							{ name: 'tailwind-styled-components', test: /tailwind-styled-components/ },
							{ name: 'uuid', test: /uuid/ },
							{ name: 'zod', test: /zod/ },
							{ name: 'zustand', test: /zustand/ }
						]
					}
				}
			}
		}
	}
})
