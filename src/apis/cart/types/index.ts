import type { CartStatus } from '../constants'

export interface ICart extends IBaseEntity {
	session_id: number
	table_id: number
	order_no: string
	created_by_employee: string
	status: CartStatus
	items: Array<{
		image: string | null
		name: string
		price: number
		quantity: number
	}>
}
