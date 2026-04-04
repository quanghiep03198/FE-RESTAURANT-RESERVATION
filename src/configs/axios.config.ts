import { RequestHeaders } from '@/common/constants/enums'

import { AuthService } from '@/apis/auth/services'
import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import qs from 'qs'
import { toast } from 'sonner'
import { AppConfigs } from './app.config'

type PromiseExecutor<T = unknown> = {
	resolve: (value: T) => void
	reject: (reason?: unknown) => void
}

export class AxiosClient {
	public instance: AxiosInstance
	private isRefreshingToken = false
	private unauthorizedRequestHandlers: Array<PromiseExecutor<string | null>> = []

	/**
	 * @description List of error codes that should be notified to the user
	 */
	private readonly NOTIFIABLE_ERROR_CODES = [
		HttpStatusCode.BadRequest,
		HttpStatusCode.Forbidden,
		HttpStatusCode.NotFound,
		HttpStatusCode.PayloadTooLarge,
		HttpStatusCode.Conflict,
		HttpStatusCode.TooManyRequests
	]

	constructor(baseURL: string, version: string = '1.0') {
		// * Instance configuration
		this.instance = axios.create({
			baseURL: baseURL,
			timeout: 10_000,
			// withCredentials: true,
			headers: {
				[RequestHeaders.CONTENT_TYPE]: 'application/json',
				[RequestHeaders.API_VERSION]: version
			},
			paramsSerializer: (params) => {
				return qs.stringify(params, {
					skipNulls: true,
					format: 'RFC1738' // use RFC1738 to encode spaces as '+'
				})
			}
		})
		// * Instance request interceptor
		this.instance.interceptors.request.use(
			(config) => {
				const accessToken = AuthService.getAccessToken()
				if (!accessToken) return config
				config.headers[RequestHeaders.AUTHORIZATION] = `Bearer ${accessToken}`
				return config
			},
			(error) => Promise.reject(error)
		)
		// * Instance response interceptor
		this.instance.interceptors.response.use(
			(response) => response.data,
			async (error: AxiosError<ResponseBody<null>>) => {
				if (error.code === AxiosError.ETIMEDOUT || error.code === AxiosError.ECONNABORTED) {
					toast.error('Không có phản hồi')
					return Promise.reject(new Error('Request timeout'))
				}
				if (this.NOTIFIABLE_ERROR_CODES.includes(error.response?.status)) {
					toast.error(error.response?.data?.message, {
						id: error.response?.data?.path,
						duration: 5000
					})
				}

				const originalRequest = error.config
				const errorStatus = error.response?.status

				if (originalRequest && !originalRequest.retry && errorStatus === HttpStatusCode.Unauthorized) {
					const abortController = new AbortController()

					if (this.isRefreshingToken) {
						return new Promise((resolve, reject) => {
							this.unauthorizedRequestHandlers.push({ resolve, reject })
						})
							.then((token) => {
								originalRequest.headers['Authorization'] = `Bearer ${token}`
								return this.instance(originalRequest)
							})
							.catch((err) => {
								return Promise.reject(err)
							})
					}
					// * Marking the request is refreshing token
					this.isRefreshingToken = true

					const credentials = AuthService.getCredentials()
					if (!credentials) {
						abortController.abort()
						throw new AxiosError('Missing user credentials')
					}

					try {
						const accessToken = await AuthService.refreshToken(abortController?.signal)
						if (!accessToken) throw new AxiosError('Cannot get access token')
						this.processQueue(null, accessToken)
						const response = await this.instance(originalRequest)
						originalRequest.retry = true
						return response
					} catch (err) {
						const error = err as AxiosError
						this.processQueue(error, null)
						return Promise.reject(error)
					} finally {
						this.isRefreshingToken = false
					}
				}

				return Promise.reject(error)
			}
		)
	}

	private processQueue(error: AxiosError | null, token = null) {
		this.unauthorizedRequestHandlers.forEach((promise) => {
			if (error) {
				promise.reject(error)
			} else {
				promise.resolve(token)
			}
		})
		this.unauthorizedRequestHandlers = []
	}
}

export const { instance: axiosInstance } = new AxiosClient(AppConfigs.BASE_API_URL, '1.0')
