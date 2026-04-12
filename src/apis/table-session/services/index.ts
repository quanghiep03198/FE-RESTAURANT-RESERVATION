import { axiosInstance } from '@/configs/axios.config'
import type { ITableSession } from '../types'

export class TableSessionService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<ITableSession[]>, void>(`/table/sessions`)
	}

	public static async insertOne(payload: { table_id: number; guest_count: number }) {
		return await axiosInstance.post(`/table/sessions`, payload)
	}

	public static async updateOne({ id, ...payload }) {
		return await axiosInstance.put(`/table/sessions/${id}`, payload)
	}
}
