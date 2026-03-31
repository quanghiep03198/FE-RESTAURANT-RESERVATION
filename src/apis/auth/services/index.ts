import { useAuthStore } from '@/apis/auth/stores'
import type { IUser } from '@/apis/user/types'
import { axiosInstance } from '@/configs/axios.config'
import { queryClient } from '@/providers/query-client-provider'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { TLoginFormValues } from '../schemas/login.schema'
import type { TLoginResponse } from '../types'

export class AuthService {
	public static async login(payload: TLoginFormValues) {
		return await axiosInstance.post<AxiosError<ResponseBody<null>>, ResponseBody<TLoginResponse>, TLoginFormValues>(
			'/auth/login',
			payload
		)
	}

	public static async profile(config: AxiosRequestConfig) {
		return await axiosInstance.get<void, ResponseBody<IUser>>('/auth/me')
	}

	public static getCredentials() {
		return useAuthStore.getState()?.user
	}

	public static setAccessToken(accessToken: string) {
		return useAuthStore.getState().setAccessToken(accessToken)
	}

	public static getAccessToken() {
		return useAuthStore.getState()?.accessToken
	}

	public static async logout() {
		useAuthStore.getState().resetCredentials() // * reset auth state
		queryClient.removeQueries({ type: 'all', exact: false }) // * remove all triggered queries
		queryClient.cancelQueries({ fetchStatus: 'fetching' }) // * cancel all running queries
		queryClient.clear() // * clear cached queries
	}

	public static async revokeToken() {
		return await axiosInstance.post<undefined, ResponseBody<null>>('/auth/logout')
	}

	public static async refreshToken(signal: AbortSignal) {
		const {
			metadata: { accessToken }
		} = await axiosInstance.get<void, ResponseBody<{ accessToken: string }>>('/auth/refresh', { signal })

		useAuthStore.getState().setAccessToken(accessToken)

		return accessToken
	}
}
