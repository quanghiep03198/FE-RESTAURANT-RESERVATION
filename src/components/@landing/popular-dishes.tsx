import { useGetDishesQuery } from '@/apis/menu/hooks/use-dish-request'
import Image from '@/components/shared/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { sortBy } from 'lodash-es'

const PopularDishesSection = () => {
	const { data } = useGetDishesQuery()

	return (
		<section id='popular-dishes' className='py-8 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
					<Badge variant='outline' className='text-sm font-normal'>
						Món bán chạy
					</Badge>
					<h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Best-seller của quán</h2>
					<p className='text-muted-foreground text-xl'>
						Đây là những món được gọi nhiều nhất mỗi ngày, nổi bật với vị đậm, ăn tiện và cực hợp cho những bữa ăn
						nhanh nhưng vẫn chất lượng.
					</p>
				</div>

				{/* Dishes */}
				<div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
					{Array.isArray(data) &&
						sortBy(data.slice(0, 5), (item) => item.created_at)
							.filter((item) => item.is_featured)
							.map((dish, index) => (
								<Card
									key={index}
									className='hover:border-primary overflow-hidden transition-colors duration-300'>
									<Image
										src={dish.image?.url}
										alt={dish.name}
										className='aspect-video w-full object-contain'
									/>
									<CardContent>
										<CardTitle className='text-lg'>{dish.name}</CardTitle>
									</CardContent>

									<CardFooter>
										<div className='text-muted-foreground'>
											<CardTitle className='mb-1 text-base font-medium'>{dish.category?.name}</CardTitle>
											<CardDescription>{dish.description}</CardDescription>
										</div>
									</CardFooter>
								</Card>
							))}
				</div>
			</div>
		</section>
	)
}

export default PopularDishesSection
