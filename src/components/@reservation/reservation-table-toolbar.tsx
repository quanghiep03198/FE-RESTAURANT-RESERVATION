import type { IReservation } from '@/apis/reservation/types'
import type { Table } from '@tanstack/react-table'
import type { EventEmitter } from 'ahooks/lib/useEventEmitter'
import React from 'react'

const ReservationTableToolbar: React.FC<{ table: Table<IReservation>; event$: EventEmitter<any> }> = ({ table }) => {
	return <div></div>
}

export default ReservationTableToolbar
