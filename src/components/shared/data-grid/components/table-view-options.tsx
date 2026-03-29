import { cn } from '@/common/utils/cn'
import { useUpdate } from 'ahooks'

import { Tooltip } from '@/components/customs/tooltip'
import { buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Columns, Undo } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTableContext } from '../context/table.context'

export const TableViewOptions: React.FC = () => {
	const { table } = useTableContext('table')

	const rerender = useUpdate()

	return (
		<DropdownMenu>
			<Tooltip
				message='Columns'
				triggerProps={{
					render: (
						<DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
							<HugeiconsIcon icon={Columns} />
						</DropdownMenuTrigger>
					)
				}}></Tooltip>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuLabel>Hiển thị cột</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllLeafColumns()
					.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='whitespace-nowrap capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={(value) => {
									column.toggleVisibility(!!value)
									rerender()
								}}>
								{column.columnDef.header?.toString()}
							</DropdownMenuCheckboxItem>
						)
					})}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='place-content-center gap-x-2 font-medium'
					onClick={() => {
						table.resetColumnVisibility()
						rerender()
					}}>
					<HugeiconsIcon icon={Undo} />
					Đặt lại
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
