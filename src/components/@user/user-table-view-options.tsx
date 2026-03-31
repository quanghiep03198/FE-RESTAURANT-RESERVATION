import useMediaQuery from '@/hooks/use-media-query'
import { LayoutTwoColumnIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { type Table } from '@tanstack/react-table'
import { Tooltip } from '../customs/tooltip'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'

export function UserTableViewOptions<TData>({ table }: { table: Table<TData> }) {
	const isMobile = useMediaQuery('(max-width: 768px)')

	return (
		<DropdownMenu>
			<Tooltip message='Thiết lập cột' contentProps={{ hidden: !isMobile }}>
				<DropdownMenuTrigger
					render={
						<Button variant={isMobile ? 'ghost' : 'outline'} size={isMobile ? 'icon' : 'default'}>
							<HugeiconsIcon icon={LayoutTwoColumnIcon} />
							{!isMobile && 'Thiết lập cột'}
						</Button>
					}
				/>
			</Tooltip>
			<DropdownMenuContent align='end' className='w-60'>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Tùy chỉnh hiển thị</DropdownMenuLabel>
					{table
						.getAllColumns()
						.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className='capitalize'
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}>
									{column.columnDef.header?.toString()}
								</DropdownMenuCheckboxItem>
							)
						})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
