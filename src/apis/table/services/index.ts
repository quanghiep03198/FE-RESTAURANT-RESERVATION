import { axiosInstance } from '@/configs/axios.config'
import type { ITable } from '../types'

export class TableService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<ITable[]>>('/table/tables')
	}
}
