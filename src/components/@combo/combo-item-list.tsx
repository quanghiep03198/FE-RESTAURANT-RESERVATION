import { useGetCombosQuery } from '@/apis/menu/hooks/use-combo-request'

import { useStoredComboFilter } from '@/apis/menu/hooks/use-stored-combo-filter'
import { useMemo } from 'react'
import { Button } from '../ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { ItemGroup } from '../ui/item'
import { Skeleton } from '../ui/skeleton'
import ComboItem from './combo-item'

const ComboItemList: React.FC = () => {
	const { data, isLoading } = useGetCombosQuery()
	const { filterValues, resetFilterValues } = useStoredComboFilter()

	const filteredData = useMemo(() => {
		let _data = data ?? []

		if (filterValues.name)
			_data = _data.filter((combo) => combo.name.toLowerCase().includes(filterValues.name?.toLowerCase() ?? ''))

		return _data
	}, [data, filterValues])

	if (isLoading)
		return (
			<div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
				{Array.from({ length: 6 }, (_, index) => (
					<Skeleton key={index} className='h-24 w-full rounded-md' />
				))}
			</div>
		)

	return (
		<section>
			<ItemGroup className='xxl:grid-cols-3 grid grid-cols-1 xl:grid-cols-2'>
				{Array.isArray(filteredData) && filteredData.length > 0 ? (
					filteredData.map((combo) => <ComboItem key={combo.id} data={combo} />)
				) : (
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant='icon'>
								<Icon name='UtensilsCrossed' />
							</EmptyMedia>
							<EmptyTitle>Không có kết quả phù hợp</EmptyTitle>
							<EmptyDescription>
								Có vẻ như combo bạn đang tìm hiện không nằm trong thực đơn. Hãy thử tìm một combo khác hoặc dạo
								quanh
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button size='sm' onClick={() => resetFilterValues()}>
								Xem tất cả món ăn
							</Button>
						</EmptyContent>
					</Empty>
				)}
			</ItemGroup>
		</section>
	)
}

export default ComboItemList
