import { axiosInstance } from '@/configs/axios.config'
import type { ITableSession } from '../types'

export class TableSessionService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<ITableSession[]>, void>(`/table/sessions`)
	}

	public static async insertOne(payload: {
		table_id: number
		guest_count: number
		reservation_code: string | undefined
	}) {
		return await axiosInstance.post(`/table/sessions`, payload)
	}

	public static async updateOne(id, payload) {
		return await axiosInstance.patch(`/table/sessions/${id}`, payload)
	}
}
