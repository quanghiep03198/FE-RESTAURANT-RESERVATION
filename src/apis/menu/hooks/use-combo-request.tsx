import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { ComboService } from '../services'

export const GET_COMBO_QUERY_KEY = 'COMBO'

export const getCombosQueryOptions = () =>
	queryOptions({
		queryKey: [GET_COMBO_QUERY_KEY],
		queryFn: ComboService.getAll,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata : [])
	})

export const useGetCombosQuery = () => {
	return useSuspenseQuery(getCombosQueryOptions())
}
