import type { IUser } from '@/apis/user/types'
import useMediaQuery from '@/hooks/use-media-query'
import type { Table } from '@tanstack/react-table'
import type { EventEmitter } from 'ahooks/lib/useEventEmitter'
import tw from 'tailwind-styled-components'
import { Tooltip } from '../customs/tooltip'
import GlobalFilterInput from '../shared/data-grid/components/global-filter-input'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'
import CategoryStatusFilter from './category-status-filter'
import CategoryTableRefetchButton from './category-table-refetch-button'

const CategoryTableToolbar: React.FC<{
	table: Table<IUser>
	event$: EventEmitter<Record<string, unknown>>
}> = ({ table }) => {
	const isMobile = useMediaQuery('(max-width: 767px)')
	const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter

	return (
		<Toolbar>
			<ToolbarGroup className='md:flex-1 md:basis-full'>
				<GlobalFilterInput table={table} />
				<CategoryStatusFilter table={table} />
				{isFiltered && (
					<Tooltip
						message='Bỏ lọc'
						triggerProps={{
							render: (
								<Button
									variant='outline'
									size={isMobile ? 'icon' : 'default'}
									onClick={() => {
										table.resetGlobalFilter()
										table.resetColumnFilters()
									}}>
									{!isMobile && 'Bỏ lọc'} <Icon name='FunnelX' />
								</Button>
							)
						}}
						contentProps={{ hidden: !isMobile }}></Tooltip>
				)}
			</ToolbarGroup>
			<ToolbarGroup>
				<CategoryTableRefetchButton />
			</ToolbarGroup>
		</Toolbar>
	)
}

const Toolbar: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-stretch justify-between gap-x-1.5`
const ToolbarGroup: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-center gap-x-1.5`

export default CategoryTableToolbar
