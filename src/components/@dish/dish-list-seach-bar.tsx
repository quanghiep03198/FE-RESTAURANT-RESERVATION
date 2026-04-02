import { useStoredDishFilter } from '@/apis/menu/hooks/use-stored-dish-filter'
import { Icon } from '@/components/ui/icon'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { useDebounce } from 'ahooks'
import React, { useEffect, useState } from 'react'
import DishFilterSidebarTrigger from './dish-filter-sidebar-trigger'

const DishListSearchBar: React.FC = () => {
	const { filterValues, setFilterValues } = useStoredDishFilter()

	const [value, setValue] = useState<string>(filterValues.name ?? '')
	const debouncedSearch = useDebounce(value, { wait: 200 })

	useEffect(() => {
		if (value !== filterValues.name) setValue(filterValues.name)
	}, [filterValues.name])

	useEffect(() => {
		setFilterValues((prev) => ({ ...prev, name: debouncedSearch }))
	}, [debouncedSearch])

	return (
		<InputGroup className='bg-background h-10 basis-full @5xl:basis-1/4'>
			<InputGroupAddon>
				<Icon name='Search' />
			</InputGroupAddon>
			<InputGroupInput
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				placeholder='Tìm kiếm...'
				type='search'
			/>
			<InputGroupButton render={<DishFilterSidebarTrigger />} />
		</InputGroup>
	)
}

export default DishListSearchBar
