import { axiosInstance } from '@/configs/axios.config'
import type { TCreateReservationValues } from '../schemas/create-reservation.schema'
import type { TUpdateReservationValues } from '../schemas/update-reservation.schema'
import type { IReservation } from '../types'

export class ReservationService {
	public static async insertOneByCustomer(payload: TCreateReservationValues) {
		return await axiosInstance.post<unknown, ResponseBody<IReservation>, TCreateReservationValues>(
			'/reservations/store-by-customer',
			payload
		)
	}

	public static async insertOneByStaff(payload: TCreateReservationValues) {
		return await axiosInstance.post<unknown, ResponseBody<IReservation>, TCreateReservationValues>(
			'/reservations',
			payload
		)
	}

	public static async updateOne(code: string, payload: TUpdateReservationValues) {
		return await axiosInstance.patch<unknown, ResponseBody<IReservation>, TUpdateReservationValues>(
			`/reservations/${code}`,
			payload
		)
	}

	public static async deleteOne(code: string) {
		return await axiosInstance.delete<unknown, ResponseBody<IReservation>, void>(`/reservations/${code}`)
	}
}
