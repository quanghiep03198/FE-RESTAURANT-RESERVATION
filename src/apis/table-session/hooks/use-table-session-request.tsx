import { GET_TABLE_QUERY_KEY } from '@/apis/table/hooks/use-table-request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TableSessionStatus } from '../constants'
import { TableSessionService } from '../services'

export const GET_TABLE_SESSIONS_QUERY_KEY = 'TABLE_SESSIONS'

export const useGetTableSessionsQuery = () => {
	return useQuery({
		queryKey: [GET_TABLE_SESSIONS_QUERY_KEY],
		queryFn: TableSessionService.getAll,
		select: (response) =>
			Array.isArray(response.metadata)
				? response.metadata.filter((item) => item.is_active && item.status === TableSessionStatus.OPEN)
				: []
	})
}

export const useCreateTableSessionMutation = () => {
	const invalidateQueries = useInvalidateQueries()

	return useMutation({
		mutationFn: TableSessionService.insertOne,
		onSuccess: () => {
			invalidateQueries()
		}
	})
}

export const useEndTableSessionMutation = () => {
	const invalidateQueries = useInvalidateQueries()

	return useMutation({
		mutationFn: (id: number) => TableSessionService.updateOne(id, { status: TableSessionStatus.CANCELLED }),
		onSuccess: () => {
			invalidateQueries()
		}
	})
}

const useInvalidateQueries = () => {
	const queryClient = useQueryClient()

	return () =>
		queryClient.invalidateQueries({
			predicate: (query) =>
				query.queryKey.some((key) => key === GET_TABLE_QUERY_KEY || key === GET_TABLE_SESSIONS_QUERY_KEY)
		})
}
