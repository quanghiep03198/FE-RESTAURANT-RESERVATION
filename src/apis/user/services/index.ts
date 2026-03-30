import { axiosInstance } from '@/configs/axios.config'
import type { TCreateUserSchema } from '../schemas/create-user.schema'
import type { TUpdateUserSchema } from '../schemas/udpate-user.schema'
import type { IUser } from '../types'

export class UserService {
	public static async getUsers() {
		return await axiosInstance.get<void, ResponseBody<IUser>>('/users')
	}

	public static async createUser(payload: TCreateUserSchema) {
		return await axiosInstance.post<void, ResponseBody<IUser>, TCreateUserSchema>('/users', payload)
	}

	public static async updateUser(id: number, payload: TUpdateUserSchema) {
		return await axiosInstance.patch<void, ResponseBody<unknown>, TUpdateUserSchema>(`/users/${id}`, payload)
	}
}
