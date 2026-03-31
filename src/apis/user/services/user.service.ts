import { axiosInstance } from '@/configs/axios.config'
import type { TCreateUserValues } from '../schemas/create-user.schema'
import type { TUpdateUserValues } from '../schemas/update-user.schema'
import type { IUser } from '../types'

export class UserService {
	public static async getUsers() {
		return await axiosInstance.get<void, ResponseBody<IUser>>('/users')
	}

	public static async createUser(payload: TCreateUserValues) {
		return await axiosInstance.post<void, ResponseBody<IUser>, TCreateUserValues>('/users', payload)
	}

	public static async updateUser(id: number, payload: TUpdateUserValues) {
		return await axiosInstance.patch<void, ResponseBody<unknown>, TUpdateUserValues>(`/users/${id}`, payload)
	}
}
