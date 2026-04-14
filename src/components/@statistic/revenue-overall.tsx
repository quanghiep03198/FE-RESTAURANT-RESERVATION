import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'

const data: Array<{ daily_amount: number; date: string }> = [
	{ daily_amount: 3_120_000, date: '2026-04-01' },
	{ daily_amount: 4_580_000, date: '2026-04-02' },
	{ daily_amount: 2_950_000, date: '2026-04-03' },
	{ daily_amount: 5_200_000, date: '2026-04-04' },
	{ daily_amount: 6_300_000, date: '2026-04-05' },
	{ daily_amount: 4_750_000, date: '2026-04-06' },
	{ daily_amount: 7_100_000, date: '2026-04-07' },
	{ daily_amount: 8_430_000, date: '2026-04-08' },
	{ daily_amount: 5_900_000, date: '2026-04-09' },
	{ daily_amount: 6_720_000, date: '2026-04-10' },
	{ daily_amount: 9_050_000, date: '2026-04-11' },
	{ daily_amount: 10_200_000, date: '2026-04-12' },
	{ daily_amount: 7_880_000, date: '2026-04-13' },
	{ daily_amount: 11_340_000, date: '2026-04-14' }
]

const chartConfig = {
	revenue: {
		label: 'Doanh thu',
		color: 'var(--chart-1)'
	}
}

const RevenueOverall: React.FC = () => {
	return (
		<Card>
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
						<LineChart
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
							<ChartTooltip
								content={
									<ChartTooltipContent
										className='w-37.5'
										nameKey='views'
										labelFormatter={(value) => {
											return new Date(value).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric'
											})
										}}
									/>
								}
							/>
							<Line
								dataKey={'daily_amount'}
								type='monotone'
								stroke={`var(--color-${chartConfig})`}
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	)
}

export default RevenueOverall
