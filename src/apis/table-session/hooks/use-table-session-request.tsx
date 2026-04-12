import { GET_TABLE_QUERY_KEY } from '@/apis/table/hooks/use-table-request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TableSessionService } from '../services'

const GET_TABLE_SESSIONS_KEY = 'TABLE_SESSIONS'

export const useGetTableSessionsQuery = () => {
	return useQuery({
		queryKey: [GET_TABLE_SESSIONS_KEY],
		queryFn: TableSessionService.getAll,
		refetchInterval: 5000,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata.filter((item) => item.is_active) : [])
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
		mutationFn: TableSessionService.updateOne,
		onSuccess: () => {
			invalidateQueries()
		}
	})
}

export const useUpdateTableSessionMutation = () => {
	const invalidateQueries = useInvalidateQueries()

	return useMutation({
		mutationFn: TableSessionService.updateOne,
		onSuccess: () => {
			invalidateQueries()
		}
	})
}

const useInvalidateQueries = () => {
	const queryClient = useQueryClient()

	return () =>
		queryClient.invalidateQueries({
			predicate: (query) => query.queryKey.some((key) => key === GET_TABLE_QUERY_KEY)
		})
}
