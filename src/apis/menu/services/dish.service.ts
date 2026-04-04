import { BaseService } from '@/apis/base/base.service'
import type { IDish } from '../types'

export class DishService extends BaseService {
	public static async getAll() {
		return await this.request.get<unknown, ResponseBody<IDish>>('/menu/dishes')
	}

	public static async insertOne(payload: any) {
		return await this.request.post<unknown, ResponseBody<IDish>>(
			'/menu/dishes',
			this.createFormData(payload),
			this.MULTIPART_CONFIG
		)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await this.request.post<unknown, ResponseBody<IDish>>(
			`/menu/dishes/${slug}`,
			this.createFormData({ ...payload, _method: 'PUT' }),
			this.MULTIPART_CONFIG
		)
	}

	public static async deleteOneBySlug(slug: string) {
		return await this.request.delete<unknown, ResponseBody<null>>(`/menu/dishes/${slug}`)
	}
}
