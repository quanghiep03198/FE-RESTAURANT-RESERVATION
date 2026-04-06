import { TableStatus } from '@/apis/table/constants'
import { useGetTableQuery } from '@/apis/table/hooks/use-table-request'

import { Icon } from '../ui/icon'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '../ui/item'
import { Skeleton } from '../ui/skeleton'

const TablesMapOverview = () => {
	const { data, isLoading } = useGetTableQuery()

	const totalTables = Array.isArray(data) ? data.length : 0
	const availableTables = Array.isArray(data)
		? data.filter((table) => table.status === TableStatus.AVAILABLE).length
		: 0
	const occupiedTables = Array.isArray(data) ? data.filter((table) => table.status === TableStatus.OCCUPIED).length : 0
	const reservedTables = Array.isArray(data) ? data.filter((table) => table.status === TableStatus.RESERVED).length : 0

	if (isLoading)
		return (
			<section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
				{Array.from({ length: 4 }, (_, index) => (
					<Skeleton key={index} className='h-60' />
				))}
			</section>
		)

	return (
		<ItemGroup className='[&>*[data-slot=item]]:bg-card grid gap-4 gap-x-4 md:grid-cols-2 xl:grid-cols-4 [&>*[data-slot=item]]:shadow'>
			<Item>
				<ItemMedia variant='image' className='bg-accent size-16'>
					<Icon name='CirclePlus' size={24} className='stroke-accent-foreground' />
				</ItemMedia>
				<ItemContent>
					<ItemDescription>TỔNG SỐ BÀN</ItemDescription>
					<ItemTitle className='text-2xl font-bold'>{totalTables}</ItemTitle>
				</ItemContent>
			</Item>
			<Item>
				<ItemMedia variant='image' className='bg-accent size-16'>
					<Icon name='CircleDashed' size={24} className='stroke-accent-foreground' />
				</ItemMedia>
				<ItemContent>
					<ItemDescription>BÀN TRỐNG</ItemDescription>
					<ItemTitle className='text-2xl font-bold'>{availableTables}</ItemTitle>
				</ItemContent>
			</Item>
			<Item>
				<ItemMedia variant='image' className='bg-accent size-16'>
					<Icon name='Users' size={24} className='stroke-accent-foreground' />
				</ItemMedia>
				<ItemContent>
					<ItemDescription>ĐANG DÙNG</ItemDescription>
					<ItemTitle className='text-2xl font-bold'>{occupiedTables}</ItemTitle>
				</ItemContent>
			</Item>
			<Item>
				<ItemMedia variant='image' className='bg-accent size-16'>
					<Icon name='CalendarCheck' size={24} className='stroke-accent-foreground' />
				</ItemMedia>
				<ItemContent>
					<ItemDescription>ĐÃ ĐẶT</ItemDescription>
					<ItemTitle className='text-2xl font-bold'>{reservedTables}</ItemTitle>
				</ItemContent>
			</Item>
		</ItemGroup>
	)
}

export default TablesMapOverview
