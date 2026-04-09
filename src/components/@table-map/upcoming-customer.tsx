import { faker } from '@faker-js/faker'
import { Link } from '@tanstack/react-router'
import { addHours, format } from 'date-fns'
import React from 'react'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { Icon } from '../ui/icon'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '../ui/item'
import { Typography } from '../ui/typography'

const reservations = Array.from({ length: 5 }, (_, index) => ({
	id: index + 1,
	customer_name: faker.person.fullName(),
	num_of_customer: Math.round(Math.random() * 10) + 1,
	phone: faker.phone.number({ style: 'national' }),
	comming_time: faker.date.soon(),
	table_slug: 'B1',
	possible_arrive_at: addHours(new Date(), 1),
	status: 'upcoming'
}))

const UpcommingCustomer: React.FC = () => {
	return (
		<section className='bg-sidebar sticky top-0 col-start-2 row-span-2 flex h-full w-sm flex-col justify-between space-y-6 rounded-lg p-4 shadow-lg'>
			<div className='flex items-center justify-between gap-x-2'>
				<Typography variant='h4'>Khách sắp đến</Typography>
				<Badge variant='secondary'>
					<Icon name='Clock' /> 2 giờ tới
				</Badge>
			</div>

			<ItemGroup className='max-h-full flex-1'>
				{reservations.map((reservation) => (
					<Item key={reservation.id} className='p-0'>
						<ItemMedia variant='icon' className='bg-secondary text-secondary-foreground size-16 rounded-lg'>
							<time>{format(reservation.possible_arrive_at, 'HH:mm')}</time>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>{reservation.customer_name}</ItemTitle>
							<ItemDescription className='inline-flex items-center gap-x-2'>
								<Icon name='Users' />
								{reservation.num_of_customer} khách - Bàn {reservation.table_slug}
							</ItemDescription>
							<ItemDescription className='inline-flex items-center gap-x-2'>
								<Icon name='Phone' /> {reservation.phone}
							</ItemDescription>
						</ItemContent>
					</Item>
				))}
			</ItemGroup>

			<Link to='/reservations' className={buttonVariants({ size: 'lg', className: 'w-full' })}>
				Tất cả đặt bàn
			</Link>
		</section>
	)
}

export default UpcommingCustomer
