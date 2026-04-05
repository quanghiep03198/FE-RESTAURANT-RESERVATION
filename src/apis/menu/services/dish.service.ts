import { BaseService } from '@/apis/base/base.service'
import { axiosInstance } from '@/configs/axios.config'
import type { IDish } from '../types'

export class DishService extends BaseService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<IDish[]>>('/menu/dishes')
	}

	public static async insertOne(payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<IDish>>(
			'/menu/dishes',
			DishService.createFormData(payload),
			DishService.MULTIPART_CONFIG
		)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<IDish>>(
			`/menu/dishes/${slug}`,
			DishService.createFormData({ ...payload, _method: 'PUT' }),
			DishService.MULTIPART_CONFIG
		)
	}

	public static async deleteOneBySlug(slug: string) {
		return await axiosInstance.delete<unknown, ResponseBody<null>>(`/menu/dishes/${slug}`)
	}
}
