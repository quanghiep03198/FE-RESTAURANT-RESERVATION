import { axiosInstance } from '@/configs/axios.config'
import type { IDish } from '../types'

function toFormData(payload: Record<string, unknown>): FormData {
	const formData = new FormData()
	const jsonFields: Record<string, unknown> = {}

	for (const [key, value] of Object.entries(payload)) {
		if (value instanceof File) {
			formData.append(key, value)
		} else if (value instanceof Blob) {
			formData.append(key, value)
		} else {
			jsonFields[key] = value
		}
	}

	formData.append('data', new Blob([JSON.stringify(jsonFields)], { type: 'application/json' }))

	return formData
}

const MULTIPART_CONFIG = { headers: { 'Content-Type': 'multipart/form-data' } }

export class DishService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<IDish>>('/menu/dishes')
	}

	public static async insertOne(payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<IDish>>(
			'/menu/dishes',
			toFormData(payload),
			MULTIPART_CONFIG
		)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await axiosInstance.put<unknown, ResponseBody<IDish>>(
			`/menu/dishes/${slug}`,
			toFormData(payload),
			MULTIPART_CONFIG
		)
	}

	public static async deleteOneBySlug(slug: string) {
		return await axiosInstance.delete<unknown, ResponseBody<null>>(`/menu/dishes/${slug}`)
	}
}
