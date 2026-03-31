import type { IUser } from '@/apis/user/types'
import { Search } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Table } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

const UserGlobalFilter: React.FC<{ table: Table<IUser> }> = ({ table }) => {
	const [value, setValue] = useState<string>(table.getState().globalFilter)

	useEffect(() => {
		const timeout = setTimeout(() => {
			table.setGlobalFilter(String(value))
		}, 200)

		return () => clearTimeout(timeout)
	}, [value])

	return (
		<InputGroup className='basis-full @5xl:basis-1/4'>
			<InputGroupAddon>
				<HugeiconsIcon icon={Search} />
			</InputGroupAddon>
			<InputGroupInput
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				placeholder='Tìm kiếm...'
				type='search'
			/>
		</InputGroup>
	)
}
export default UserGlobalFilter
