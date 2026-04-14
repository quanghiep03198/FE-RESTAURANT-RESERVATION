import type { IReservation } from '@/apis/reservation/types'
import type { TableStatus } from '../constants'

export interface ITable extends IBaseEntity {
	name: string
	capacity: number
	sort_order: number
	status: TableStatus
	reservation: IReservation | null
}

export interface ITableCardData extends ITable {
	session_id: number | undefined
	cart_id: number | undefined
	reservation_code: string | undefined
}
