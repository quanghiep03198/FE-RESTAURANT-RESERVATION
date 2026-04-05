import { useSessionStorageState } from 'ahooks'

type TStoredFilterValues = {
	name: string
	price: Record<'min' | 'max', number> | null
	category: string | null
	isActive: boolean | null
}

const DEFAULT_FILTER_VALUES: TStoredFilterValues = { name: '', price: null, category: null, isActive: null }

export const useStoredComboFilter = () => {
	const [filterValues, setFilterValues] = useSessionStorageState<TStoredFilterValues>('combo_filter', {
		listenStorageChange: true,
		defaultValue: DEFAULT_FILTER_VALUES
	})

	const resetFilterValues = () => setFilterValues(DEFAULT_FILTER_VALUES)

	return { filterValues, setFilterValues, resetFilterValues }
}
