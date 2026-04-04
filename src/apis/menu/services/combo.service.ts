import { BaseService } from '@/apis/base/base.service'
import { axiosInstance } from '@/configs/axios.config'
import type { ICombo } from '../types'

export class ComboService extends BaseService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<ICombo>>('/menu/combos')
	}

	public static async insertOne(payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<ICombo>, typeof payload>('/menu/combos', payload)
	}

	public static async updateOneBySlug(slug: string, payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<ICombo>>(
			`/menu/combos/${slug}`,
			this.createFormData({ ...payload, _method: 'PUT' }),
			this.MULTIPART_CONFIG
		)
	}

	public static async deleteOneBySlug(slug: string, payload: any) {
		return await axiosInstance.post<unknown, ResponseBody<ICombo>>(
			`/menu/combos/${slug}`,
			this.createFormData({ ...payload, _method: 'PUT' }),
			this.MULTIPART_CONFIG
		)
	}
}
