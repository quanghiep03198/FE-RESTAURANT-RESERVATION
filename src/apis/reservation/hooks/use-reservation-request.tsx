import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ReservationService } from '../services'
import { useStoredReservation } from './use-stored-reservation'

export const GET_MY_RESERVATION_KEY = 'MY_RESERVATION'

export const useCreateCustomerReservation = () => {
	const [, setStoredReservation] = useStoredReservation()

	return useMutation({
		mutationFn: ReservationService.insertOneByCustomer,
		onSuccess: (data) => {
			toast.success('Đặt bàn thành công')
			setStoredReservation(data?.metadata?.reservation_code)
		},
		onError() {
			toast.error('Đã có lỗi xảy ra khi tạo yêu cầu đặt bàn. Vui lòng thử lại sau ít phút nữa.')
		}
	})
}

export const useGetMyReservationQuery = () => {
	const [storedReservationCode] = useStoredReservation()

	return useQuery({
		queryKey: [GET_MY_RESERVATION_KEY],
		queryFn: () => ReservationService.getOneByCode(storedReservationCode),
		enabled: !!storedReservationCode,
		select: (response) => response?.metadata
	})
}
