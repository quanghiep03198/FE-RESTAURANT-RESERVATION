import env from './env'

/**
 * Build URL for static storage files (images, etc.)
 *
 * - In development: returns a relative path (e.g. `/storage/dishes/xxx.webp`)
 *   so Vite dev server proxy can forward it to the backend, bypassing CORS.
 * - In production: returns an absolute URL with the API base URL as origin.
 */
export function getStorageUrl(path: string | null | undefined): string {
	if (!path) return ''

	// If it's already an absolute URL, return as-is
	if (path.startsWith('http://') || path.startsWith('https://')) return path

	const normalizedPath = path.startsWith('/') ? path : `/${path}`

	// Production: prepend API base URL
	const baseUrl = env('VITE_BASE_URL')?.replace(/\/$/, '') ?? ''

	console.log('url', `${baseUrl}${normalizedPath}`)

	return `${baseUrl}${normalizedPath}`
}
