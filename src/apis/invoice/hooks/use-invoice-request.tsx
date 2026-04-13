import { GET_RESERVATIONS_QUERY_KEY } from '@/apis/reservation/hooks/use-reservation-request'
import { GET_TABLE_SESSIONS_QUERY_KEY } from '@/apis/table-session/hooks/use-table-session-request'
import { GET_TABLE_QUERY_KEY } from '@/apis/table/hooks/use-table-request'
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { InvoiceService } from '../services'

export const GET_INVOICE_QUERY_KEY = 'INVOICES'

export const getInvoicesQueryOptions = () => {
	return queryOptions({
		queryKey: [GET_INVOICE_QUERY_KEY],
		queryFn: InvoiceService.getAll,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata : [])
	})
}

export const useGetInvoiceQuery = () => {
	return useSuspenseQuery(getInvoicesQueryOptions())
}

export const useCreateInvoiceMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: InvoiceService.insertOne,
		onSuccess: () => {
			toast.success('Tạo hóa đơn thành công')
			queryClient.invalidateQueries({
				predicate: (query) => {
					const mutationKeys = [
						GET_INVOICE_QUERY_KEY,
						GET_TABLE_QUERY_KEY,
						GET_RESERVATIONS_QUERY_KEY,
						GET_TABLE_SESSIONS_QUERY_KEY
					]

					return query.queryKey.some((key: any) => mutationKeys.includes(key))
				}
			})
		},
		onError: () => {
			toast.error('Tạo hóa đơn thất bại')
		}
	})
}
