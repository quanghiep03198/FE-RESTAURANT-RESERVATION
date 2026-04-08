import { axiosInstance } from '@/configs/axios.config'

export class ReservationService {
	public static async insertOneByCustomer(payload: any) {
		return await axiosInstance.post('/reservations/store-by-customer', payload)
	}

	public static async insertOneByStaff(payload: any) {
		return await axiosInstance.post('/reservations', payload)
	}
}
