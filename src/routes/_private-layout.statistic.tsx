import BestSellers from '@/components/@statistic/best-sellers'
import RevenueOverall from '@/components/@statistic/revenue-overall'
import StatisticCardGroup from '@/components/@statistic/statistic-card-group'
import { MonthPicker } from '@/components/customs/month-picker'
import {
	PageAction,
	PageDescription,
	PageHeader,
	PageSeparator,
	PageTitle,
	PageWrapper
} from '@/components/layouts/@private/app-page'
import useQueryParams from '@/hooks/use-query-params'
import { useSeoHelper } from '@/hooks/use-seo-helper'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'

export const Route = createFileRoute('/_private-layout/statistic')({
	component: RouteComponent
})

function RouteComponent() {
	const metadata = useSeoHelper('administration')
	const { searchParams, setParams } = useQueryParams<{ year_month: string }>({
		year_month: format(new Date(), 'yyyy-MM')
	})

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />

			<PageWrapper>
				<PageHeader>
					<PageTitle>Thống kê</PageTitle>
					<PageDescription className='hidden lg:block'>
						Bạn có thể theo dõi doanh thu, số lượng đặt bàn, và các chỉ số quan trọng khác để quản lý hiệu quả
						hơn.
					</PageDescription>
					<PageAction>
						<MonthPicker
							selectedMonth={searchParams?.year_month ? new Date(searchParams?.year_month) : new Date()}
							onMonthSelect={(value) => setParams({ year_month: format(value, 'yyyy-MM') })}
						/>
					</PageAction>
				</PageHeader>
				<PageSeparator />
				<section className='xxl:grid-cols-12 xxl:auto-rows-[fit-content] grid grid-flow-col grid-cols-1 gap-6'>
					<StatisticCardGroup />
					<RevenueOverall />
					<BestSellers />
				</section>
			</PageWrapper>
		</>
	)
}
