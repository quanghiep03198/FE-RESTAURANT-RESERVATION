import { useMutation } from '@tanstack/react-query'
import { ReservationService } from '../services'

export const useCreateCustomerReservation = () => {
	return useMutation({
		mutationFn: ReservationService.insertOneByCustomer
	})
}
