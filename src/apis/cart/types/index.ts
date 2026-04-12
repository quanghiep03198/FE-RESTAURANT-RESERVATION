import type { CartStatus } from '../constants'

export interface ICart extends IBaseEntity {
	session_id: number
	table_id: number
	order_no: string
	created_by_employee: string
	status: CartStatus
	item_list: Array<{
		id: number
		image: string | null
		name: string
		type: 'dish' | 'combo'
		unit_price: number
		quantity: number
	}>
}
