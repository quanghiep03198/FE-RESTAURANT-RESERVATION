import { useGetDishesQuery } from '@/apis/menu/hooks/use-dish-request'
import Image from '@/components/shared/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useMemo } from 'react'

const NewItemsSection = () => {
	const { data } = useGetDishesQuery()

	const newDishes = useMemo(() => {
		if (!Array.isArray(data)) return []

		return data.filter((item) => item.is_new)
	}, [data])

	return (
		<section id='new-items' className='py-8 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
					<Badge variant='outline' className='text-sm font-normal'>
						Món mới
					</Badge>
					<h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Vừa lên kệ, ăn là ghiền</h2>
					<p className='text-muted-foreground text-xl'>
						Khám phá những món mới nhất trong menu thức ăn nhanh của chúng tôi, từ burger phiên bản mới đến món ăn
						kèm đậm vị cho mọi cuộc hẹn ăn nhanh.
					</p>
				</div>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{newDishes.map((item, index) => (
						<Card
							className='hover:border-primary pt-0 transition-colors duration-300 max-lg:last:col-span-full'
							key={index}>
							<Image src={item.image?.url} alt={item.name} className='aspect-video h-60 w-full object-contain' />
							<CardHeader className='mb-2 gap-3'>
								<CardTitle className='text-xl capitalize'>
									<Link href='#'>{item.name}</Link>
								</CardTitle>
								<CardDescription className='text-base'>{item.description}</CardDescription>
							</CardHeader>
							<CardFooter className='mt-auto'>
								<Button
									className='group bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm has-[>svg]:px-6'
									size='lg'
									render={
										<Link href={item.name}>
											Thực đơn
											<ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
										</Link>
									}
								/>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default NewItemsSection
