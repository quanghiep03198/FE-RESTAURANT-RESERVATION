import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'

import tw from 'tailwind-styled-components'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Icon } from '../ui/icon'

const CategoryOverviews: React.FC = () => {
	const { data } = useGetCategoriesQuery()

	return (
		<div className='xxl:grid-cols-4 grid grid-cols-1 gap-4 xl:grid-cols-2 [&>*[data-slot=card-content]]:py-6 [&>*[data-slot=card-description]]:text-pretty [&>*[data-slot=card]]:grid-cols-[1fr_4fr] [&>*[data-slot=card]]:gap-0 [&>*[data-slot=card]]:p-0 [&>*[data-slot=card]:not(:last-child)]:grid'>
			<Card>
				<CardImage>
					<Icon name='ChefHat' size={48} strokeWidth={1} />
				</CardImage>
				<CardContent className='py-6'>
					<CardDescription>Tổng số</CardDescription>
					<CardTitle className='text-4xl'>{Array.isArray(data) ? data.length : 0}</CardTitle>
					<CardDescription className='mt-2'>Danh mục trong thực đơn trên hệ thống</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardImage>
					<Icon name='HandPlatter' size={48} strokeWidth={1} />
				</CardImage>
				<CardContent className='py-6'>
					<CardDescription>Hiện đang phục vụ</CardDescription>
					<CardTitle className='text-4xl'>
						{Array.isArray(data) ? data.filter((item) => item.is_active).length : 0}
					</CardTitle>
					<CardDescription className='mt-2'>Danh mục hiện đang phục vụ trong nhà hàng</CardDescription>
				</CardContent>
			</Card>
			<Card className='grid grid-cols-[1fr_2fr] gap-0 p-0'>
				<CardImage>
					<Icon name='Soup' size={48} strokeWidth={1} />
				</CardImage>
				<CardContent className='py-6'>
					<CardDescription>Tổng món</CardDescription>
					<CardTitle className='text-4xl'>
						{Array.isArray(data)
							? data.filter((item) => item.is_active).reduce((acc, curr) => acc + curr.dishes.length, 0)
							: 0}
					</CardTitle>
					<CardDescription className='mt-2'>Tổng </CardDescription>
				</CardContent>
			</Card>
			<Card className='bg-primary text-primary-foreground'>
				<CardContent className='grid grid-cols-[auto_1fr] gap-3 py-6'>
					<Icon
						name='Lightbulb'
						size={28}
						strokeWidth={1.5}
						className='drop-shadow-[0px_0px_2px_var(--primary-foreground)]'
					/>
					<CardTitle className='col-start-2'>Mẹo quản lý</CardTitle>
					<CardDescription className='text-primary-foreground col-start-2'>
						Tối ưu hóa hình ảnh danh mục để thu hút khách hàng hơn 25%.
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	)
}

const CardImage = tw.div`col-start-1 h-full w-full aspect-[3/4] bg-radial-[at_25%_25%] to-75% from-background to-accent text-acceent-foreground rounded-l-[inherit]  inline-grid place-content-center`

export default CategoryOverviews
