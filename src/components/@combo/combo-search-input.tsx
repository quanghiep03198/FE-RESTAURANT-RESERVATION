import { useStoredComboFilter } from '@/apis/menu/hooks/use-stored-combo-filter'
import { useDebounce } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { Icon } from '../ui/icon'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

const ComboSearchInput: React.FC = () => {
	const { filterValues, setFilterValues } = useStoredComboFilter()

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
		</InputGroup>
	)
}

export default ComboSearchInput
