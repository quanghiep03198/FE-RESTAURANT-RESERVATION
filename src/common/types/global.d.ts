/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference types="vite/client" />

import type { HttpStatusCode } from "axios";

export declare global {
	interface ImportMetaEnv {
		readonly VITE_API_BASE_URL: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}

	type RuntimeEnvironment = "production" | "development" | "test";

	interface ResponseBody<T> {
		message: string;
		statusCode: HttpStatusCode;
		metadata: T | null;
		path: string;
		stack?: string;
		timestamp: Date;
	}

	type FirstParameter<T> = T extends (
		first: infer FirstArgument,
		...args: any[]
	) => any
		? FirstArgument
		: never;

	type Parameter<T> = T extends (param: infer Argument) => any
		? Argument
		: never;

	type AnonymousFunction = (...args: any[]) => any;
}
