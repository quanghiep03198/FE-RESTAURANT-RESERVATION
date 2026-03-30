import type { IUser } from '@/apis/user/types'
import { Search } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Table } from '@tanstack/react-table'
import React from 'react'
import { DebouncedInput } from '../customs/debounced-input'
import { buttonVariants } from '../ui/button'
import { ButtonGroup } from '../ui/button-group'

const UserGlobalFilter: React.FC<{ table: Table<IUser> }> = ({ table }) => {
	return (
		<ButtonGroup
			className={buttonVariants({
				variant: 'outline',
				size: 'default',
				className: 'bg-background hover:bg-background font-normal'
			})}>
			<HugeiconsIcon icon={Search} />
			<DebouncedInput
				value={table.getState().globalFilter}
				onChange={(value) => {
					table.setGlobalFilter(String(value))
				}}
				className='bg-background h-full min-w-44 p-0 shadow-none placeholder:text-sm md:max-w-32 md:min-w-32 xl:min-w-56'
				placeholder='Tìm kiếm...'
				type='search'
			/>
		</ButtonGroup>
	)
}
export default UserGlobalFilter
