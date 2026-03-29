import { cn } from '@/common/utils/cn'
import { type Table } from '@tanstack/react-table'
import { pick } from 'lodash-es'

import { DebouncedInput } from '@/components/customs/debounced-input'
import { Tooltip } from '@/components/customs/tooltip'
import { buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SearchIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTableContext } from '../context/table.context'

type GlobalFilterPopoverProps = {
	enableGlobalFilter: boolean
	globalFilter: ReturnType<Table<unknown>['getState']>['globalFilter']
	onGlobalFilterChange: Table<unknown>['setGlobalFilter']
}

export const GlobalFilterPopover: React.FC<GlobalFilterPopoverProps> = ({
	enableGlobalFilter,
	globalFilter,
	onGlobalFilterChange
}) => {
	const { table, event$ } = useTableContext('table', 'event$')
	if (!enableGlobalFilter) return null

	return (
		<Popover>
			<Tooltip
				message='Tìm kiếm'
				triggerProps={{
					render: (
						<PopoverTrigger className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
							<HugeiconsIcon icon={SearchIcon} />
						</PopoverTrigger>
					)
				}}
			/>

			<PopoverContent align='end' side='left' sideOffset={4} className='relative w-64 p-0'>
				<HugeiconsIcon icon={SearchIcon} className='absolute top-1/2 left-2 -translate-y-1/2' />
				<DebouncedInput
					value={globalFilter}
					onChange={(value) => {
						event$.emit(pick(table.getState(), ['rowSelection']))
						onGlobalFilterChange(String(value))
					}}
					className='font-lg border p-2 pl-8 placeholder:text-sm'
					placeholder='Tìm kiếm...'
					type='search'
				/>
			</PopoverContent>
		</Popover>
	)
}
