import type { ReservationStatus } from '@/apis/reservation/constants'
import type { IReservation } from '@/apis/reservation/types'
import type { Column, Table } from '@tanstack/react-table'
import type { EventEmitter } from 'ahooks/lib/useEventEmitter'
import React from 'react'
import GlobalFilterInput from '../shared/data-grid/components/global-filter-input'
import {
	DataTableFacetedFilter,
	type IDataTableFacetedFilterProps
} from '../shared/data-grid/components/table-faceted-filter'
import RefetchButton from './refetch-button'
import { reservationStatusMap } from './status-badge'

const statusFilterOptions: IDataTableFacetedFilterProps<IReservation, ReservationStatus>['options'] = Object.entries(
	Object.fromEntries(reservationStatusMap)
).map(([status, data]) => ({
	label: data.label,
	value: status as ReservationStatus,
	icon: data.icon,
	color: data.color
}))

const ReservationTableToolbar: React.FC<{ table: Table<IReservation>; event$: EventEmitter<any> }> = ({ table }) => {
	return (
		<div className='flex items-center gap-x-2'>
			<GlobalFilterInput table={table} />
			<DataTableFacetedFilter
				column={table.getColumn('role') as Column<IReservation, ReservationStatus>}
				title='Trạng thái'
				options={statusFilterOptions}
			/>
			<RefetchButton className='ml-auto' />
		</div>
	)
}

export default ReservationTableToolbar
