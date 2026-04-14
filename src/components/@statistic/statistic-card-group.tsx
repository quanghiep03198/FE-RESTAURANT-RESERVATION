import { useGetStatisticSummaryQuery } from '@/apis/statistic/hooks/use-statistic-request'
import { formatCurrency } from '@/common/utils/format-currency'
import formatIntlNumber from '@/common/utils/format-intl-number'
import { useMemo } from 'react'
import { Badge } from '../ui/badge'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'
import { Typography } from '../ui/typography'
import {
	formatPercentageChange,
	getAnalysisSentence,
	getDetailDescription,
	getIconColor,
	getTrendingIcon
} from './helper-text'

const PercentageBadge: React.FC<{ percentage: number | null }> = ({ percentage }) => (
	<Badge variant='outline' className='gap-x-2'>
		<Icon size={12} name={getTrendingIcon(percentage)} style={{ color: getIconColor(percentage) }} />
		{formatPercentageChange(percentage)}
	</Badge>
)

const StatisticCardGroup: React.FC = () => {
	const [
		prevMonthQueryResult,
		currMonthQueryResult
		// { data: prevMonthData, isLoading: prevMonthDataLoading },
		// { data: currMonthData, isLoading: currMonthDataLoading }
	] = useGetStatisticSummaryQuery()

	if (prevMonthQueryResult?.isLoading || currMonthQueryResult?.isLoading)
		return (
			<div className='grid grid-cols-1 gap-4 md:max-lg:grid-cols-2 xl:grid-cols-4'>
				{Array.from({ length: 4 }, (_, i) => (
					<Skeleton key={i} className='h-48' />
				))}
			</div>
		)

	const prevMonthRevenue = prevMonthQueryResult?.data?.revenue?.month?.total_amount ?? 0
	const currMonthRevenue = currMonthQueryResult?.data?.revenue?.month?.total_amount ?? 0

	const prevMonthServiceTime = prevMonthQueryResult?.data?.average_service_time?.served_sessions ?? 0
	const currMonthServiceTime = currMonthQueryResult?.data?.average_service_time?.served_sessions ?? 0

	const prevMonthServiceInMinutes = prevMonthQueryResult?.data?.average_service_time?.average_minutes ?? 0
	const currMonthServiceInMinutes = currMonthQueryResult?.data?.average_service_time?.average_minutes ?? 0

	const revenuePercentageChange: number = useMemo(() => {
		return ((currMonthRevenue - prevMonthRevenue) / (currMonthRevenue || 100)) * 100
	}, [prevMonthQueryResult, currMonthQueryResult])

	const serviceTimePercentageChange: number = useMemo(() => {
		return ((currMonthServiceTime - prevMonthServiceTime) / (currMonthServiceTime || 100)) * 100
	}, [prevMonthQueryResult, currMonthQueryResult])

	const serviceInMinutesPercentageChange: number = useMemo(() => {
		return ((currMonthServiceInMinutes - prevMonthServiceInMinutes) / (currMonthServiceInMinutes || 100)) * -100
	}, [prevMonthQueryResult, currMonthQueryResult])

	return (
		<div className='grid grid-cols-4 gap-4 sm:max-md:grid-cols-1 md:max-xl:grid-cols-2 [&_*[data-slot=card-title]]:text-2xl'>
			<Card>
				<CardHeader>
					<CardDescription>Tổng doanh thu</CardDescription>
					<CardTitle>{formatCurrency(currMonthQueryResult?.data?.revenue?.month?.total_amount ?? 0)}</CardTitle>
					<CardAction>
						<PercentageBadge percentage={revenuePercentageChange} />
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<Typography variant='small' className='line-clamp-1 flex gap-2 font-medium'>
						{getAnalysisSentence(revenuePercentageChange)}
						<Icon name={getTrendingIcon(revenuePercentageChange)} />
					</Typography>
					<Typography variant='small' className='text-muted-foreground lowercase first-letter:uppercase'>
						{getDetailDescription(revenuePercentageChange, currMonthRevenue - prevMonthRevenue, '₫')}
					</Typography>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardDescription>Lượt phục vụ trong tháng</CardDescription>
					<CardTitle>
						{formatIntlNumber(currMonthQueryResult?.data?.average_service_time?.served_sessions)}
					</CardTitle>
					<CardAction>
						<PercentageBadge percentage={serviceTimePercentageChange} />
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<Typography variant='small' className='line-clamp-1 flex gap-2 font-medium'>
						{getAnalysisSentence(serviceTimePercentageChange)}
						<Icon name={getTrendingIcon(serviceTimePercentageChange)} />
					</Typography>
					<Typography variant='small' className='text-muted-foreground lowercase first-letter:uppercase'>
						{getDetailDescription(
							serviceTimePercentageChange,
							currMonthServiceTime - prevMonthServiceTime,
							'lượt'
						)}
					</Typography>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardDescription>Thời gian phục vụ trung bình mỗi phiên</CardDescription>
					<CardTitle>{currMonthQueryResult?.data?.average_service_time?.average_minutes} (phút)</CardTitle>
					<CardAction>
						<PercentageBadge percentage={serviceInMinutesPercentageChange} />
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<Typography variant='small' className='line-clamp-1 flex gap-2 font-medium'>
						{getAnalysisSentence(serviceInMinutesPercentageChange)}
						<Icon name={getTrendingIcon(serviceInMinutesPercentageChange)} />
					</Typography>
					<Typography variant='small' className='text-muted-foreground lowercase first-letter:uppercase'>
						{getDetailDescription(
							serviceInMinutesPercentageChange,
							(currMonthServiceInMinutes - prevMonthServiceInMinutes) * -1,
							'phút'
						)}
					</Typography>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardDescription>Tỉ lệ đặt bàn thành công</CardDescription>
					<CardTitle>{currMonthQueryResult?.data?.average_service_time?.average_minutes} (phút)</CardTitle>
				</CardHeader>
			</Card>
		</div>
	)
}

export default StatisticCardGroup
