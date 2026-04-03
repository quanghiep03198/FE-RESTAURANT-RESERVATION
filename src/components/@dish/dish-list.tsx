import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'
import { useStoredDishFilter } from '@/apis/menu/hooks/use-stored-dish-filter'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { sortBy } from 'lodash-es'
import { useMemo } from 'react'
import { Tooltip } from '../customs/tooltip'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'
import { Typography } from '../ui/typography'
import DishCard from './dish-card'

const DishList = () => {
	const { event$ } = usePageContext()
	const { data, isLoading } = useGetCategoriesQuery()
	const { filterValues, resetFilterValues } = useStoredDishFilter()

	const filteredData = useMemo(() => {
		if (!Array.isArray(data)) return []

		let _data = data.map((item) => {
			item.dishes = item.dishes.filter((dish) => dish.is_active)
			return item
		})

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
			_data = _data
				.filter((item) =>
					item.dishes.some((dish) => dish.price > filterValues.price.min && dish.price < filterValues.price.max)
				)
				.map((item) => {
					item.dishes = item.dishes.filter(
						(dish) => dish.price > filterValues.price.min && dish.price < filterValues.price.max
					)
					return item
				})

		if (typeof filterValues.isActive === 'boolean')
			_data.filter((item) => item.dishes.some((dish) => dish.is_active === filterValues.isActive))

		return _data
	}, [filterValues, data])

	const handleOpenCreateDishDialog = (id: number, name: string) => {
		event$.emit({
			action: CommonActions.CREATE,
			payload: { id, name }
		})
	}

	if (isLoading)
		return (
			<div className='grid grid-cols-2 gap-x-4 gap-y-10 @[920px]:grid-cols-3 @[1200px]:grid-cols-4'>
				{Array.from({ length: 12 }, (_, index) => (
					<Skeleton key={index} className='h-64' />
				))}
			</div>
		)

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
												className='bg-background rounded-full opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100'
												onClick={() => handleOpenCreateDishDialog(item.id, item.name)}>
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
										{sortBy(item.dishes, ['is_new', 'is_featured']).map((dish) => (
											<CarouselItem className='basis-1/2 @[920px]:basis-1/3 @[1200px]:basis-1/4'>
												<div className='h-full p-1'>
													<DishCard data={{ ...dish, category_name: item.name }} />
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
									<Button variant='outline' onClick={() => handleOpenCreateDishDialog(item.id, item.name)}>
										Thêm món
									</Button>
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
