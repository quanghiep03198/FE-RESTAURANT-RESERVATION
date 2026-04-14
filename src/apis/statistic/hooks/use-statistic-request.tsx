import useQueryParams from '@/hooks/use-query-params'
import { useQueries } from '@tanstack/react-query'
import { format, subMonths } from 'date-fns'
import { StatisticService } from '../services'
import type { IStatisticSummary } from '../types'

const GET_STATISTIC_SUMMARY_QUERY_KEY = 'STATISTIC_SUMMARY'

export const useGetStatisticSummaryQuery = () => {
	const { searchParams } = useQueryParams<{ year_month: string }>({ year_month: format(new Date(), 'yyyy-MM') })

	return useQueries({
		queries: [
			{
				queryKey: [
					GET_STATISTIC_SUMMARY_QUERY_KEY,
					format(subMonths(new Date(searchParams.year_month), 1), 'yyyy-MM')
				],
				queryFn: async () =>
					await StatisticService.getStatisticSummary({
						year: subMonths(new Date(searchParams.year_month), 1).getFullYear(),
						month: subMonths(new Date(searchParams.year_month), 1).getMonth()
					}),
				refetchInterval: 5000,
				select: (response: ResponseBody<IStatisticSummary>) => response.metadata
			},
			{
				queryKey: [GET_STATISTIC_SUMMARY_QUERY_KEY, searchParams.year_month],
				queryFn: async () =>
					await StatisticService.getStatisticSummary({
						year: new Date(searchParams.year_month).getFullYear(),
						month: new Date(searchParams.year_month).getMonth() + 1
					}),
				refetchInterval: 5000,
				select: (response: ResponseBody<IStatisticSummary>) => response.metadata
			}
		]
	})
}
