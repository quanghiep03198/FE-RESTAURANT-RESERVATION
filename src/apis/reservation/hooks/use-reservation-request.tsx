import { queryOptions, useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { addHours } from 'date-fns'
import { toast } from 'sonner'
import { ReservationService } from '../services'
import { useStoredReservation } from './use-stored-reservation'

export const GET_MY_RESERVATION_KEY = 'MY_RESERVATION'

export const GET_RESERVATIONS_KEY = 'RESERVATIONS'

export const getReservationsQueryOptions = () =>
	queryOptions({
		queryKey: [GET_RESERVATIONS_KEY],
		queryFn: ReservationService.getAll,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata : [])
	})

export const useGetReservationsQuery = () => {
	return useSuspenseQuery(getReservationsQueryOptions())
}

export const useCreateCustomerReservation = () => {
	const { storedReservation, setStoredReservation } = useStoredReservation()

	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ReservationService.insertOneByCustomer,
		onSuccess: (data) => {
			toast.success('Đặt bàn thành công')
			setStoredReservation({
				code: data?.metadata?.reservation_code,
				expired: addHours(data?.metadata?.reservation_time, 1)
			})
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey.some((key) => key === GET_MY_RESERVATION_KEY || key === storedReservation)
			})
		},
		onError() {
			toast.error('Đã có lỗi xảy ra khi tạo yêu cầu đặt bàn. Vui lòng thử lại sau ít phút nữa.')
		}
	})
}

export const useGetMyReservationQuery = () => {
	const { storedReservation } = useStoredReservation()

	return useQuery({
		queryKey: [GET_MY_RESERVATION_KEY, storedReservation?.code],
		queryFn: () => ReservationService.getOneByCode(storedReservation?.code),
		enabled: !!storedReservation?.code,
		select: (response) => response?.metadata
	})
}

export const useDeleteReservationMutation = () => {
	const { storedReservation, setStoredReservation } = useStoredReservation()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => ReservationService.deleteOne(storedReservation.code),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey.some((key) => key === GET_MY_RESERVATION_KEY || key === storedReservation)
			})
			toast.success('Hủy đặt bàn thành công')
			setStoredReservation(null)
		},
		onError: () => {
			toast.error('Hủy đặt bàn thất bại')
		}
	})
}
