import { useGetStatisticSummaryQuery } from '@/apis/statistic/hooks/use-statistic-request'
import { useGetUsersQuery } from '@/apis/user/hooks/use-user-request'
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
	getServiceTimeQuality,
	getTrendingIcon
} from './helper-text'

const PercentageBadge: React.FC<{ percentage: number | null }> = ({ percentage }) => (
	<Badge variant='outline' className='gap-x-2'>
		<Icon size={12} name={getTrendingIcon(percentage)} style={{ color: getIconColor(percentage) }} />
		{formatPercentageChange(percentage)}
	</Badge>
)

const MAX_STAFF = 20

const StatisticCardGroup: React.FC = () => {
	const [prevMonthQueryResult, currMonthQueryResult] = useGetStatisticSummaryQuery()
	const { data: users } = useGetUsersQuery()

	const totalStaff = useMemo(() => {
		return users?.filter((user) => user.role.code !== 'OWNER' && user.role.code !== 'MANAGER').length ?? 0
	}, [users])

	const prevMonthRevenue = prevMonthQueryResult?.data?.revenue?.month?.total_amount ?? 0
	const currMonthRevenue = currMonthQueryResult?.data?.revenue?.month?.total_amount ?? 0

	const prevMonthServiceTime = prevMonthQueryResult?.data?.average_service_time?.served_sessions ?? 0
	const currMonthServiceTime = currMonthQueryResult?.data?.average_service_time?.served_sessions ?? 0

	const currMonthServiceInMinutes = currMonthQueryResult?.data?.average_service_time?.average_minutes ?? 0

	const revenuePercentageChange: number = useMemo(() => {
		return ((currMonthRevenue - prevMonthRevenue) / (currMonthRevenue || 100)) * 100
	}, [prevMonthRevenue, currMonthRevenue])

	const serviceTimePercentageChange: number = useMemo(() => {
		return ((currMonthServiceTime - prevMonthServiceTime) / (currMonthServiceTime || 100)) * 100
	}, [prevMonthServiceTime, currMonthServiceTime])

	const serviceTimeQuality = getServiceTimeQuality(currMonthServiceInMinutes)

	if (prevMonthQueryResult?.isLoading || currMonthQueryResult?.isLoading)
		return (
			<div className='lg:max-xxl:grid-cols-2 xxl:col-span-8 col-span-12 col-start-1 row-span-1 row-start-1 grid grid-cols-2 gap-4 sm:max-lg:grid-cols-1'>
				{Array.from({ length: 4 }, (_, i) => (
					<Skeleton key={i} className='h-48' />
				))}
			</div>
		)

	return (
		<section className='lg:max-xxl:grid-cols-2 xxl:col-span-8 col-span-12 col-start-1 row-span-1 row-start-1 grid grid-cols-2 gap-4 sm:max-lg:grid-cols-1 [&_*[data-slot=card-title]]:text-2xl'>
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
					<CardDescription>Lượt phục vụ</CardDescription>
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
					<CardDescription>T/G phục vụ trung bình</CardDescription>
					<CardTitle>{currMonthServiceInMinutes} phút</CardTitle>
					<CardAction>
						<Badge variant='outline'>{serviceTimeQuality.badge}</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<Typography variant='small' className='line-clamp-1 flex gap-2 font-medium'>
						{serviceTimeQuality.headline}
					</Typography>
					<Typography variant='small' className='text-muted-foreground lowercase first-letter:uppercase'>
						{serviceTimeQuality.description}
					</Typography>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardDescription>SL nhân viên phục vụ</CardDescription>
					<CardTitle>{totalStaff}</CardTitle>
					<CardAction>
						<Badge variant='outline'>
							<Icon name='Users' className='size-3! gap-x-3' /> {totalStaff}/{MAX_STAFF}
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					<Typography variant='small' className='line-clamp-1 flex gap-2 font-medium'>
						{totalStaff >= MAX_STAFF ? 'Số lượng nhân viên đạt tối đa' : 'Số lượng nhân viên có thể tuyển thêm'}
					</Typography>
					<Typography variant='small' className='text-muted-foreground lowercase first-letter:uppercase'>
						{totalStaff >= MAX_STAFF
							? 'Số lượng nhân viên đạt tối đa, có thể xem xét tuyển thêm để đảm bảo chất lượng dịch vụ'
							: `Có thể tuyển thêm ${MAX_STAFF - totalStaff} nhân viên để tối ưu trải nghiệm khách hàng`}
					</Typography>
				</CardFooter>
			</Card>
		</section>
	)
}

export default StatisticCardGroup
