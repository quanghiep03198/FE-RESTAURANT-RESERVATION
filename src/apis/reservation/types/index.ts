import type { ReservationStatus } from '../constants'

export interface IReservation extends IBaseEntity {
	customer_name: string
	customer_phone: string
	reservation_code: string
	reservation_time: Date
	table_code: string | null
	status: ReservationStatus
	guest_count: number
	deposit_amount: number
	created_by_employee?: string
	confirmed_by_employee: string | null
	cancelled_by_employee: string | null
	confirmed_at: Date | null
	cancelled_at: Date | null
	hold_start_time: Date | null
	hold_end_time: Date | null
}
