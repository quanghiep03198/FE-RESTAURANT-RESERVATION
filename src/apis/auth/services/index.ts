import { useAuthStore } from '@/apis/auth/stores'
import { axiosInstance } from '@/configs/axios.config'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { TLoginFormValues } from '../schemas/login.schema'
import type { IUser, TLoginResponse } from '../types'

export class AuthService {
	public static async login(payload: TLoginFormValues) {
		return await axiosInstance.post<AxiosError<ResponseBody<null>>, ResponseBody<TLoginResponse>, TLoginFormValues>(
			'/auth/login',
			payload
		)
	}

	public static async profile(config: AxiosRequestConfig) {
		return await axiosInstance.get<void, ResponseBody<IUser>>('/auth/me', config)
	}

	public static getCredentials() {
		return useAuthStore.getState()?.user
	}

	public static getAccessToken() {
		return useAuthStore.getState()?.accessToken
	}

	public static async logout() {
		return await axiosInstance.post<undefined, ResponseBody<null>>('/auth/logout')
	}

	public static async refreshToken(signal: AbortSignal) {
		return await axiosInstance.get<void, ResponseBody<{ accessToken: string }>>('/auth/refresh-token', { signal })
	}
}
