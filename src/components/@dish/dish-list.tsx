import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'
import { Tooltip } from '../customs/tooltip'
import { Button } from '../ui/button'

import { useStoredDishFilter } from '@/apis/menu/hooks/use-stored-dish-filter'
import { useMemo } from 'react'
import { Badge } from '../ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Typography } from '../ui/typography'
import DishCard from './dish-card'

const DishList = () => {
	const { data } = useGetCategoriesQuery()
	const { filterValues, resetFilterValues } = useStoredDishFilter()

	const filteredData = useMemo(() => {
		let _data = data

		if (filterValues.category) _data = _data.filter((item) => item.slug === filterValues.category)

		if (filterValues.name)
			_data = _data.filter((item) =>
				item.dishes.some((dish) => dish.name.toLowerCase().trim().includes(filterValues.name.trim().toLowerCase()))
			)

		if (
			filterValues.price &&
			typeof filterValues.price?.min === 'number' &&
			typeof filterValues.price?.max === 'number'
		)
			_data = _data.filter((item) =>
				item.dishes.some((dish) => dish.price > filterValues.price.min && dish.price < filterValues.price.max)
			)

		if (typeof filterValues.isActive === 'boolean')
			_data.filter((item) => item.dishes.some((dish) => dish.is_active === filterValues.isActive))

		return _data
	}, [filterValues, data])

	return (
		<div className='@container space-y-10'>
			{Array.isArray(filteredData) && filteredData.length > 0 ? (
				filteredData.map((item) => (
					<div className='group max-w-(--outlet-wrapper-width) space-y-3'>
						<div className='flex items-center justify-between gap-x-2'>
							<Typography variant='h3' className='inline-flex items-center gap-x-2' id={item.slug}>
								<Icon name='Link' /> {item.name} <Badge>{item.dishes.length} món</Badge>
							</Typography>
							{item.dishes.length > 0 && (
								<Tooltip
									message='Thêm món'
									triggerProps={{
										render: (
											<Button
												variant='outline'
												size='icon'
												className='bg-background rounded-full opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100'>
												<Icon name='Plus' />
											</Button>
										)
									}}
								/>
							)}
						</div>
						{Array.isArray(item.dishes) && item.dishes.length > 0 ? (
							<div className='px-10'>
								<Carousel
									key={item.id}
									className='w-full'
									opts={{
										align: 'start'
									}}>
									<CarouselContent className='bg-transparent'>
										{item.dishes.map((dish) => (
											<CarouselItem className='basis-1/2 @[800px]:basis-1/3 @[1200px]:basis-1/4'>
												<div className='h-full p-1'>
													<DishCard data={dish} />
												</div>
											</CarouselItem>
										))}
									</CarouselContent>
									<CarouselPrevious className='bg-background' />
									<CarouselNext className='bg-background' />
								</Carousel>
							</div>
						) : (
							<Empty className='bg-background border border-dashed'>
								<EmptyHeader>
									<EmptyMedia variant='icon'>
										<Icon name='HandPlatter' />
									</EmptyMedia>
									<EmptyTitle>Chưa có món ăn nào</EmptyTitle>
									<EmptyDescription>
										Bạn chưa tạo món ăn nào trong danh mục này. Hãy bắt đầu với 1 món ăn cho danh mục này
									</EmptyDescription>
								</EmptyHeader>
								<EmptyContent className='flex-row justify-center gap-2'>
									<Button variant='outline'>Thêm món</Button>
								</EmptyContent>
							</Empty>
						)}
					</div>
				))
			) : (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<Icon name='UtensilsCrossed' />
						</EmptyMedia>
						<EmptyTitle>Không có kết quả phù hợp</EmptyTitle>
						<EmptyDescription>
							Có vẻ như món bạn đang tìm hiện không nằm trong thực đơn. Hãy thử tìm một món khác hoặc dạo quanh
							danh mục món ăn để chọn món thay thế nhé!
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button size='sm' onClick={() => resetFilterValues()}>
							Xem tất cả món ăn
						</Button>
					</EmptyContent>
				</Empty>
			)}
		</div>
	)
}

export default DishList
