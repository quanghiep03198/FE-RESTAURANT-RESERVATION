import { axiosInstance } from '@/configs/axios.config'
import type { IDish } from '../types'

export class DishService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<IDish>>('/menu/dishes')
	}

	public static async insertOne(payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<IDish>>('/menu/dishes', payload)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await axiosInstance.put<unknown, ResponseBody<IDish>>(`/menu/dishes/${slug}`, payload)
	}

	public static async deleteOneBySlug(slug: string) {
		return await axiosInstance.delete<unknown, ResponseBody<null>>(`/menu/dishes/${slug}`)
	}
}
