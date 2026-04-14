import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'

const data: Array<{ total_amount: number; date: string }> = [
	{ total_amount: 3_120_000, date: '2026-04-01' },
	{ total_amount: 4_580_000, date: '2026-04-02' },
	{ total_amount: 2_950_000, date: '2026-04-03' },
	{ total_amount: 5_200_000, date: '2026-04-04' },
	{ total_amount: 6_300_000, date: '2026-04-05' },
	{ total_amount: 4_750_000, date: '2026-04-06' },
	{ total_amount: 7_100_000, date: '2026-04-07' },
	{ total_amount: 8_430_000, date: '2026-04-08' },
	{ total_amount: 5_900_000, date: '2026-04-09' },
	{ total_amount: 6_720_000, date: '2026-04-10' },
	{ total_amount: 9_050_000, date: '2026-04-11' },
	{ total_amount: 10_200_000, date: '2026-04-12' },
	{ total_amount: 7_880_000, date: '2026-04-13' },
	{ total_amount: 11_340_000, date: '2026-04-14' }
]

const chartConfig = {
	revenue: {
		label: 'Doanh thu',
		color: 'var(--chart-1)'
	}
}

const RevenueOverall: React.FC = () => {
	return (
		<section className='xxl:col-span-8 col-span-12 col-start-1 row-start-2'>
			<Card className='h-full'>
				<CardHeader>
					<CardTitle>Doanh thu tháng</CardTitle>
					<CardDescription>Tổng quan doanh thu theo ngày trong tháng hiện tại</CardDescription>
				</CardHeader>
				<CardContent className='px-2 sm:p-6'>
					{false ? (
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
											nameKey='views'
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
