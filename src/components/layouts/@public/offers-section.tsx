import { useGetCombosQuery } from '@/apis/menu/hooks/use-combo-request'
import { formatCurrency } from '@/common/utils/format-currency'
import { formatStreakDaysInWeek } from '@/common/utils/format-date-time'
import Image from '@/components/shared/image'
import { Badge } from '@/components/ui/badge'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'

type GalleryImage = {
	src: string
	alt: string
	className?: string
	offerText: {
		text: string
		className?: string
	}
	offerButton: {
		text: string
		link: string
		className?: string
	}
}[]

const OfferSection = () => {
	const { data: combos } = useGetCombosQuery()

	return (
		<section id='offers' className='py-8 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
					<Badge variant='outline' className='text-sm font-normal'>
						Ưu đãi
					</Badge>

					<h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Combo ngon, giá dễ chịu</h2>

					<p className='text-muted-foreground text-xl'>
						Đừng bỏ lỡ các deal theo ngày và combo nhóm giúp bạn ăn no hơn mà vẫn tối ưu chi phí.
					</p>
				</div>

				{/* Gallery Grid */}
				<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
					{Array.isArray(combos) &&
						combos.map((data) => (
							<Item variant='outline' role='listitem' className='bg-card text-card-foreground relative'>
								<ItemMedia variant='image' className='relative size-32 h-auto w-auto text-xs xl:size-40'>
									<Image src={data.combo_image?.url} className='h-full w-full rounded-md' />
									<Badge className='absolute bottom-2 left-2 text-xs! shadow-lg'>{data.tag}</Badge>
								</ItemMedia>

								<ItemContent className='relative'>
									<ItemTitle className='text-lg'>{data.name}</ItemTitle>
									<ItemDescription>{data.remark}</ItemDescription>
									<ItemSeparator />
									<div className='auto-row-auto grid auto-cols-auto grid-flow-col gap-x-4 gap-y-2'>
										<Typography variant='small' className='col-start-1 row-start-1'>
											Thời gian áp dụng
										</Typography>
										<div className='xxl:text-base col-start-1 row-start-2 inline-flex items-center gap-x-4 text-sm'>
											<Typography className='font-medium'>
												{formatStreakDaysInWeek(data.days_in_week, true)}
											</Typography>
											<Separator orientation='vertical' />
											<Typography className='font-medium'>
												{data.start_time} - {data.end_time}
											</Typography>
										</div>
										{data.selling_price - data.discount_price !== data.selling_price && (
											<Typography
												variant='small'
												color='muted'
												className='col-start-2 row-start-1 text-right line-through'>
												{formatCurrency(data.selling_price)}
											</Typography>
										)}
										<Typography variant='h4' className='col-start-2 row-start-2 text-right'>
											{formatCurrency(data.selling_price - data.discount_price)}
										</Typography>
									</div>
								</ItemContent>
							</Item>
						))}
				</div>
			</div>
		</section>
	)
}

export default OfferSection
