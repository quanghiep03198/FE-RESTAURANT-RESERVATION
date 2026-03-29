import { Tooltip } from '@/components/customs/tooltip'
import { Toggle } from '@/components/ui/toggle'
import { FilterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTableContext } from '../context/table.context'

const ColumnFilterToggle: React.FC = () => {
	const { filterOpen, setFilterOpen } = useTableContext('filterOpen', 'setFilterOpen')

	return (
		<Tooltip
			message='Bộ lọc'
			triggerProps={{
				render: (
					<Toggle
						variant='outline'
						className='aria-pressed:bg-accent aria-pressed:text-accent-foreground hover:text-foreground size-9 place-content-center p-0'
						pressed={filterOpen}
						onPressedChange={(pressed) => {
							setFilterOpen(pressed)
						}}>
						<HugeiconsIcon icon={FilterIcon} />
					</Toggle>
				)
			}}
		/>
	)
}

export default ColumnFilterToggle
