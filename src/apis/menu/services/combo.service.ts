import { BaseService } from '@/apis/base/base.service'
import { axiosInstance } from '@/configs/axios.config'
import type { TCreateComboValues } from '../schemas/create-combo.schema.ts'
import type { TUpdateComboValues } from '../schemas/update-combo.schema.ts'
import type { ICombo } from '../types'

export class ComboService extends BaseService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<ICombo[]>>('/menu/combos')
	}

	public static async insertOne(payload: TCreateComboValues) {
		return await axiosInstance.post<unknown, ResponseBody<ICombo>>(
			'/menu/combos',
			ComboService.createFormData(payload),
			ComboService.MULTIPART_CONFIG
		)
	}

	public static async updateOneBySlug(slug: string, payload: TUpdateComboValues) {
		return await axiosInstance.post<unknown, ResponseBody<ICombo>>(
			`/menu/combos/${slug}`,
			ComboService.createFormData({ ...payload, _method: 'PATCH' }),
			ComboService.MULTIPART_CONFIG
		)
	}

	public static async deleteOneBySlug(slug: string) {
		return await axiosInstance.delete<unknown, ResponseBody<ICombo>>(`/menu/combos/${slug}`)
	}
}
