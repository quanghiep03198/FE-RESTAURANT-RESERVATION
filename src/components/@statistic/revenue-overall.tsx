import { useGetRevenueOverallQuery } from '@/apis/statistic/hooks/use-statistic-request'
import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'

const chartConfig = {
	revenue: {
		label: 'Doanh thu',
		color: 'var(--chart-1)'
	}
}

const RevenueOverall: React.FC = () => {
	const { data, isLoading } = useGetRevenueOverallQuery()

	console.log(data)

	return (
		<section className='xxl:col-span-8 col-span-12 col-start-1 row-start-2'>
			<Card className='h-full'>
				<CardHeader>
					<CardTitle>Doanh thu tháng</CardTitle>
					<CardDescription>Tổng quan doanh thu theo ngày trong tháng hiện tại</CardDescription>
				</CardHeader>
				<CardContent className='px-2 sm:p-6'>
					{isLoading ? (
						<Skeleton className='min-h-64' />
					) : !data.length ? (
						<Skeleton className='h-62.5 w-full' />
					) : !Array.isArray(data) || data.length === 0 ? (
						<div className='bg-muted text-muted-foreground mx-3 flex h-64 items-center justify-center gap-x-2 rounded-lg'>
							<Icon name='ChartArea' size={32} strokeWidth={1} />
							Không có dữ liệu
						</div>
					) : (
						<ChartContainer config={chartConfig} className='aspect-auto h-62.5 w-full'>
							<AreaChart
								accessibilityLayer
								data={data}
								margin={{
									left: 12,
									right: 12
								}}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey='date'
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									minTickGap={32}
									tickFormatter={(value) => {
										const date = new Date(value)
										return date.toLocaleDateString('vi-VN', {
											month: 'short',
											day: 'numeric'
										})
									}}
								/>
								<defs>
									<linearGradient id={`fill-revenue`} x1='0' y1='0' x2='0' y2='1'>
										<stop offset='5%' stopColor={`var(--color-revenue)`} stopOpacity={0.8} />
										<stop offset='95%' stopColor={`var(--color-revenue)`} stopOpacity={0.2} />
									</linearGradient>
								</defs>
								<ChartTooltip
									content={
										<ChartTooltipContent
											className='w-37.5'
											nameKey='date'
											labelFormatter={(value) => {
												return new Date(value).toLocaleDateString('vi-VN', {
													month: 'short',
													day: 'numeric',
													year: 'numeric'
												})
											}}
										/>
									}
								/>
								<Area
									dataKey='total_amount'
									type='natural'
									fill={`url(#fill-revenue)`}
									fillOpacity={0.6}
									stroke={`var(--color-revenue)`}
									stackId='a'
								/>
							</AreaChart>
						</ChartContainer>
					)}
				</CardContent>
			</Card>
		</section>
	)
}

export default RevenueOverall
