import { useAuthStore } from '@/apis/auth/stores'
import { axiosInstance } from '@/configs/axios.config'
import { queryClient } from '@/providers/query-client-provider'
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
		return await axiosInstance.get<void, ResponseBody<IUser>>('/auth/me')
	}

	public static getCredentials() {
		return useAuthStore.getState()?.user
	}

	public static getAccessToken() {
		return useAuthStore.getState()?.accessToken
	}

	public static async logout() {
		useAuthStore.getState().resetCredentials() // * reset auth state
		queryClient.removeQueries({ type: 'all', exact: false }) // * remove all triggered queries
		queryClient.cancelQueries({ fetchStatus: 'fetching' }) // * cancel all running queries
		queryClient.clear() // * clear cached queries
		// return await axiosInstance.post<undefined, ResponseBody<null>>('/auth/logout')
	}

	public static async refreshToken(signal: AbortSignal) {
		const {
			metadata: { accessToken }
		} = await axiosInstance.get<void, ResponseBody<{ accessToken: string }>>('/auth/refresh', { signal })

		useAuthStore.getState().setAccessToken(accessToken)

		return accessToken
	}
}
