import { CommonActions } from '@/common/constants/enums'
import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
	type MutationFunction
} from '@tanstack/react-query'
import { addHours } from 'date-fns'
import { useRef } from 'react'
import { toast } from 'sonner'
import type { TCreateReservationValues } from '../schemas/create-reservation.schema'
import type { TUpdateReservationValues } from '../schemas/update-reservation.schema'
import { ReservationService } from '../services'
import type { IReservation } from '../types'
import { useStoredReservation } from './use-stored-reservation'

export const GET_SPECIFIC_RESERVATION_QUERY_KEY = 'RESERVATION'

export const GET_RESERVATIONS_QUERY_KEY = 'RESERVATIONS'

export const getReservationsQueryOptions = () =>
	queryOptions({
		queryKey: [GET_RESERVATIONS_QUERY_KEY],
		queryFn: ReservationService.getAll,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata : [])
	})

export const useGetReservationsQuery = (fetchOnPreload: boolean = true) => {
	const queryOptions = getReservationsQueryOptions()

	return fetchOnPreload ? useSuspenseQuery(queryOptions) : useQuery(queryOptions)
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
					query.queryKey.some((key) => key === GET_SPECIFIC_RESERVATION_QUERY_KEY || key === storedReservation)
			})
		},
		onError() {
			toast.error('Đã có lỗi xảy ra khi tạo yêu cầu đặt bàn. Vui lòng thử lại sau ít phút nữa.')
		}
	})
}

export const useCreateOrUpdateReservationMutation = (action: CommonActions.CREATE | CommonActions.UPDATE) => {
	const toastRef = useRef<string | number | null>(null)
	const queryClient = useQueryClient()

	const mutationConfigFactory: Map<
		CommonActions.CREATE | CommonActions.UPDATE,
		{ handler: MutationFunction<unknown, TCreateReservationValues | TUpdateReservationValues>; message: string }
	> = new Map([
		[
			CommonActions.CREATE,
			{
				handler: async (payload: TUpdateReservationValues) => await ReservationService.insertOneByStaff(payload),
				message: 'Tạo đặt bàn thành công'
			}
		],
		[
			CommonActions.UPDATE,
			{
				handler: async ({
					reservation_code,
					...payload
				}: TUpdateReservationValues & Pick<IReservation, 'reservation_code'>) =>
					await ReservationService.updateOne(reservation_code, payload),
				message: 'Đã cập nhật thành công'
			}
		]
	])

	const currentConfig = mutationConfigFactory.get(action)

	return useMutation({
		mutationFn: currentConfig?.handler,
		onMutate: () => {
			toastRef.current = toast.loading('Đang xử lý ...')
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [GET_RESERVATIONS_QUERY_KEY] })
			toast.success(currentConfig?.message, { id: toastRef.current })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: toastRef.current })
		}
	})
}

export const useGetReservationByCodeQuery = (code: string) => {
	return useQuery({
		queryKey: [GET_SPECIFIC_RESERVATION_QUERY_KEY, code],
		queryFn: () => ReservationService.getOneByCode(code),
		enabled: !!code,
		select: (response) => response?.metadata
	})
}

export const useDeleteReservationMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (code: string) => {
			await ReservationService.deleteOne(code)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey.some(
						(key) => key === GET_SPECIFIC_RESERVATION_QUERY_KEY || key === GET_RESERVATIONS_QUERY_KEY
					)
			})
			toast.success('Hủy đặt bàn thành công')
			// setStoredReservation(null)
		},
		onError: () => {
			toast.error('Hủy đặt bàn thất bại')
		}
	})
}

export type TReservationMutation =
	| ReturnType<typeof useCreateOrUpdateReservationMutation>
	| ReturnType<typeof useCreateCustomerReservation>
