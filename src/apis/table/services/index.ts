import { axiosInstance } from '@/configs/axios.config'
import type { TCreateTableValues } from '../schemas/create-table.schema'
import type { TUpdateTableValues } from '../schemas/update-table.schema.'
import type { ITable } from '../types'

export class TableService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<ITable[]>>('/table/tables')
	}

	public static async insertOne(payload: TCreateTableValues) {
		return await axiosInstance.post<unknown, ResponseBody<ITable>, TCreateTableValues>('/table/tables', payload)
	}

	public static async updateOneBySlug(slug: string, payload: TUpdateTableValues) {
		return await axiosInstance.patch<unknown, ResponseBody<ITable>, TUpdateTableValues>(
			`/table/tables/${slug}`,
			payload
		)
	}

	public static async deleteOneBySlug(slug: string) {
		return await axiosInstance.delete<unknown, ResponseBody<void>, void>(`/table/tables/${slug}`)
	}
}
