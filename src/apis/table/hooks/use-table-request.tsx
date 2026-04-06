import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { TableService } from '../services'

export const TABLE_QUERY_KEY = 'TABLES'

export const getTableQueryOptions = () =>
	queryOptions({
		queryKey: [TABLE_QUERY_KEY],
		queryFn: TableService.getAll,
		refetchOnMount: true,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata.filter((item) => item.is_active) : [])
	})

export const useGetTableQuery = () => {
	return useSuspenseQuery(getTableQueryOptions())
}
