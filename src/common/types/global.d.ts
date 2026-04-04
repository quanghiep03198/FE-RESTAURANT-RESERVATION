/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference types="vite/client" />

import type { HttpStatusCode } from 'axios'

export declare global {
	interface ImportMetaEnv {
		readonly VITE_API_BASE_URL: string
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv
	}

	type RuntimeEnvironment = 'production' | 'development' | 'test'

	interface IBaseEntity {
		id: number
		is_active: boolean
		slug?: string
		code?: string
		created_at?: Date
		updated_at?: Date
		remark: string
	}

	type TTime = `${number}${number}:${number}${number}`

	type TDayInWeek = 'CN' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7'

	type TImageExtension = 'webp' | 'png' | 'jpg' | 'jpeg' | 'avif' | 'svg'

	type TImageMimeType = `image/${TImageExtension}`

	interface IImageMetadata {
		name: `${string}.${TImageExtension}`
		url: string
		size: number
	}

	interface ResponseBody<T> {
		message: string
		statusCode: HttpStatusCode
		metadata: T | null
		path: string
		stack?: string
		timestamp: Date
	}

	type Pagination<T = unknown> = {
		data: Array<T>
		hasNextPage: boolean
		hasPrevPage: boolean
		limit: number
		page: number
		totalDocs: number
		totalPages: number
		nextPage: number | null
		prevPage: number | null
	}

	type FirstParameter<T> = T extends (first: infer FirstArgument, ...args: any[]) => any ? FirstArgument : never

	type Parameter<T> = T extends (param: infer Argument) => any ? Argument : never

	type AnonymousFunction = (...args: any[]) => any
}
