import { useGetStatisticSummaryQuery } from '@/apis/statistic/hooks/use-statistic-request'
import type { IStatisticSummary } from '@/apis/statistic/types'
import { formatCurrency } from '@/common/utils/format-currency'
import formatIntlNumber from '@/common/utils/format-intl-number'
import { getStorageUrl } from '@/common/utils/get-storage-url'
import type React from 'react'
import Image from '../shared/image'
import { Card, CardContent } from '../ui/card'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '../ui/item'
import { Typography } from '../ui/typography'

type BestSellerItem = IStatisticSummary['top_dishes'][number] | IStatisticSummary['top_combos'][number]

const BestSellerList: React.FC<{ title: string; items: BestSellerItem[] }> = ({ title, items }) => (
	<div className='space-y-3'>
		<Typography variant='h4'>{title}</Typography>
		<ItemGroup className='gap-y-1!'>
			{items.length > 0 ? (
				items.map((item, index) => (
					<Item key={item.name + index} className='px-0' size='sm'>
						<ItemMedia variant='image' className='size-12!'>
							<Image src={getStorageUrl(item?.image?.url)} alt={item.name} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>{item.name}</ItemTitle>
							<ItemDescription>{formatCurrency(item.revenue_amount)}</ItemDescription>
						</ItemContent>
						<ItemContent>
							<ItemTitle>{formatIntlNumber(item.quantity_sold)} đã bán</ItemTitle>
						</ItemContent>
					</Item>
				))
			) : (
				<Empty className='bg-background'>
					<EmptyMedia variant='icon'>
						<Icon name='UtensilsCrossed' />
					</EmptyMedia>
					<EmptyContent>
						<EmptyTitle>Không có dữ liệu</EmptyTitle>
						<EmptyDescription>Không có món nào được bán trong tháng này</EmptyDescription>
					</EmptyContent>
				</Empty>
			)}
		</ItemGroup>
	</div>
)

const BestSellers: React.FC = () => {
	const [, currMonthStatisticQueryResult] = useGetStatisticSummaryQuery()

	const topBestSellingDishes = currMonthStatisticQueryResult?.data?.top_dishes ?? []
	const topBestSellingCombos = currMonthStatisticQueryResult?.data?.top_combos ?? []

	return (
		<Card className='xxl:col-span-4 xxl:row-span-2 xxl:row-start-1 col-span-12 row-start-3'>
			<CardContent className='xxl:flex-col flex flex-col gap-x-10 gap-y-6 *:flex-1 lg:max-xl:flex-row'>
				<BestSellerList title='Top món bán chạy' items={topBestSellingDishes} />
				<BestSellerList title='Top combo bán chạy' items={topBestSellingCombos} />
			</CardContent>
		</Card>
	)
}

export default BestSellers
