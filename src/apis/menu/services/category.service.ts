import { BaseService } from '@/apis/base/base.service'
import type { ICategory } from '../types'

export class CategoryService extends BaseService {
	public static async getAll() {
		return await this.request.get<void, ResponseBody<ICategory[]>>('/menu/categories')
	}

	public static async insertOne(payload) {
		return await this.request.post<unknown, ResponseBody<ICategory>, any>('/menu/categories', payload)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await this.request.patch<unknown, ResponseBody<ICategory>, any>(`/menu/categories/${slug}`, payload)
	}

	public static async deleteOneById(id: number) {
		return await this.request.delete<unknown, ResponseBody<ICategory>, any>(`/menu/categories/${id}`)
	}
}
