import { axiosInstance } from '@/configs/axios.config'
import type { IStatisticSummary } from '../types'

export class StatisticService {
	public static async getStatisticSummary(params: { year: number; month: number }) {
		return await axiosInstance.get<unknown, ResponseBody<IStatisticSummary>, void>('/statistics/summary', {
			params: { ...params, top_limit: 5 }
		})
	}

	/**
	 * @deprecated
	 */
	public static async getRevenueStatistic(params: string) {
		return await axiosInstance.get('/statistics/revenue', {
			params: { year: new Date(params).getFullYear(), month: new Date(params).getMonth() + 1 }
		})
	}

	/**
	 * @deprecated
	 */
	public static async getAverageServiceTime(params: string) {
		return await axiosInstance.get('/statistics/average-service-time', {
			params: { year: new Date(params).getFullYear(), month: new Date(params).getMonth() + 1 }
		})
	}
}
