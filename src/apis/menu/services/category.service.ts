import { axiosInstance } from '@/configs/axios.config'
import type { ICategory } from '../types'

export class CategoryService {
	public static async getAll() {
		return await axiosInstance.get<void, ResponseBody<ICategory[]>>('/menu/categories')
	}

	public static async insertOne(payload) {
		return await axiosInstance.post<unknown, ResponseBody<ICategory>, any>('/menu/categories', payload)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await axiosInstance.patch<unknown, ResponseBody<ICategory>, any>(`/menu/categories/${slug}`, payload)
	}

	public static async deleteOneById(id: number) {
		return await axiosInstance.delete<unknown, ResponseBody<ICategory>, any>(`/menu/categories/${id}`)
	}
}
