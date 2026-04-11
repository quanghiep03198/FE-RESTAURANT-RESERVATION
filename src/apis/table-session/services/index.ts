import { axiosInstance } from '@/configs/axios.config'

export class TableSessionService {
	public static async insertOne() {
		return await axiosInstance.post(``)
	}
}
