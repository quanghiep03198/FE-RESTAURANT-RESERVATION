import { axiosInstance } from '@/configs/axios.config'
import type { IUserRole } from '../types'

export class RoleService {
	public static async getAll() {
		return await axiosInstance.get<void, ResponseBody<IUserRole[]>>('/roles')
	}
}
