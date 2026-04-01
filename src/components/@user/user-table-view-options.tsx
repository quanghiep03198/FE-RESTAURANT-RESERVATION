import useMediaQuery from '@/hooks/use-media-query'
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
import { Icon } from '../ui/icon'

export function UserTableViewOptions<TData>({ table }: { table: Table<TData> }) {
	const isMobile = useMediaQuery('(max-width: 768px)')

	return (
		<DropdownMenu>
			<Tooltip message='Thiết lập cột' contentProps={{ hidden: !isMobile }}>
				<DropdownMenuTrigger
					render={
						<Button
							className={!isMobile && 'bg-background'}
							variant={isMobile ? 'ghost' : 'outline'}
							size={isMobile ? 'icon' : 'default'}>
							<Icon name='Columns2' />
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
