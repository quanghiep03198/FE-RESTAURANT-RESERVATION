export declare global {
	interface InternalImportMetaEnv {
		readonly VITE_API_BASE_URL: string;
	}

	interface ResponseBody<T> {
		message: string;
		statusCode: HttpStatusCode;
		metadata: T | null;
		path: string;
		stack?: string;
		timestamp: Date;
	}
}
