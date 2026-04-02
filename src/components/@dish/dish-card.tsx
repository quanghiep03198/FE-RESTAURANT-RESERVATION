import type { IDish } from '@/apis/menu/types'
import { formatCurrency } from '@/common/utils/format-currency'
import React from 'react'
import Image from '../shared/image'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const DishCard: React.FC<{ data: IDish }> = ({ data }) => {
	return (
		<Card className='relative mx-auto h-full w-full max-w-sm pt-0' title={data.name}>
			<Image
				src={data.image_url}
				alt={data.name}
				className='relative z-20 aspect-video h-40 w-full object-cover brightness-60 grayscale dark:brightness-40'
			/>
			<CardHeader className='flex-1'>
				{data.is_featured && (
					<CardAction>
						<Badge variant='secondary'>Nổi bật</Badge>
					</CardAction>
				)}
				<CardDescription className='line-clamp-1' title={data.name}>
					{data.name}
				</CardDescription>
				<CardTitle>
					{formatCurrency(data.price)} ({data.unit})
				</CardTitle>
			</CardHeader>
			<CardFooter>
				<Button variant='secondary' className='w-full'>
					Cập nhật
				</Button>
			</CardFooter>
		</Card>
	)
}

export default DishCard
