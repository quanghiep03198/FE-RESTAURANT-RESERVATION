import type { CartStatus } from '../constants'

export interface ICart extends IBaseEntity {
	cart_order_id?: number
	session_id: number
	table_id: number
	order_no: string
	created_by_employee: string
	status: CartStatus
	item_list: Array<{
		id: number
		image: IImageMetadata | null
		name: string
		type: 'dish' | 'combo'
		unit_price: number
		quantity: number
	}>
}
