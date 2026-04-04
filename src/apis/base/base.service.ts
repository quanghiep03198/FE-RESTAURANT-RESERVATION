import { axiosInstance } from '@/configs/axios.config'
import type { Method } from 'axios'

export class BaseService {
	public static get request() {
		return axiosInstance
	}

	public static readonly MULTIPART_CONFIG = { headers: { 'Content-Type': 'multipart/form-data' } }

	public static createFormData(payload: Record<string, unknown> & { _method?: Method }): FormData {
		const formData = new FormData()
		const jsonFields: Record<string, unknown> = {}

		for (const [key, value] of Object.entries(payload)) {
			if (value instanceof File) {
				formData.append(key, value)
			} else if (key === '_method' && typeof value === 'string') {
				formData.append(key, value)
			} else if (value instanceof Blob) {
				formData.append(key, value)
			} else {
				jsonFields[key] = value
			}
		}

		formData.append('data', JSON.stringify(jsonFields))

		return formData
	}
}
