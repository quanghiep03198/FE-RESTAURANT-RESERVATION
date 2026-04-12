import { useGetReservationsQuery } from '@/apis/reservation/hooks/use-reservation-request'
import { Link } from '@tanstack/react-router'
import { addHours, format, isWithinInterval } from 'date-fns'
import { upperCase } from 'lodash-es'
import React, { useMemo } from 'react'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '../ui/item'
import { Spinner } from '../ui/spinner'
import { Typography } from '../ui/typography'

const UpcommingCustomer: React.FC = () => {
	const { data, isLoading } = useGetReservationsQuery(false)

	const upcommingReservation = useMemo(() => {
		const now = new Date()
		return Array.isArray(data)
			? data.filter((reservation) =>
					isWithinInterval(new Date(reservation.reservation_time), {
						start: now,
						end: addHours(now, 2)
					})
				)
			: []
	}, [data])

	return (
		<section className='bg-sidebar sticky top-0 col-start-2 row-span-2 flex h-full w-sm flex-col justify-between space-y-6 rounded-lg p-4 shadow-lg'>
			<div className='flex items-center justify-between gap-x-2'>
				<Typography variant='h4'>Khách sắp đến</Typography>
				<Badge variant='secondary'>
					<Icon name='Clock' /> 2 giờ tới
				</Badge>
			</div>

			{isLoading ? (
				<div className='flex-1 place-content-center place-items-center'>
					<Spinner />
				</div>
			) : upcommingReservation.length > 0 ? (
				<ItemGroup className='max-h-full flex-1'>
					{upcommingReservation.map((reservation) => (
						<Item key={reservation.id} className='p-0'>
							<ItemMedia variant='icon' className='bg-secondary text-secondary-foreground size-16 rounded-lg'>
								<time>{format(reservation.reservation_time, 'HH:mm')}</time>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>{reservation.customer_name}</ItemTitle>
								<ItemDescription className='inline-flex items-center gap-x-2'>
									<Icon name='Users' />
									{reservation.guest_count} khách{' '}
									{reservation.table?.name && `- Bàn ${upperCase(reservation.table?.name)}`}
								</ItemDescription>
								<ItemDescription className='inline-flex items-center gap-x-2'>
									<Icon name='Phone' /> {reservation.customer_phone}
								</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</ItemGroup>
			) : (
				<Empty className='p-3'>
					<EmptyMedia variant='icon'>
						<Icon name='CalendarCheck2' />
					</EmptyMedia>
					<EmptyContent>
						<EmptyTitle>Không có khách nào sắp đến</EmptyTitle>
						<EmptyDescription>
							Không có đặt bàn nào trong vòng 2 giờ tới. Hãy kiểm tra lại sau hoặc xem tất cả đặt bàn để có thông
							tin chi tiết hơn.
						</EmptyDescription>
					</EmptyContent>
				</Empty>
			)}
			<Link to='/reservations' className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'w-full' })}>
				Tất cả đặt bàn
			</Link>
		</section>
	)
}

export default UpcommingCustomer
