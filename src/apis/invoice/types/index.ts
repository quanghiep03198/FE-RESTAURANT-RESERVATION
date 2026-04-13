import type { ICart } from '@/apis/cart/types'
import type { PaymentMethod, PaymentStatus } from '../constants'

export interface IInvoice extends IBaseEntity {
	cart_order_id: number
	no: string
	session_id: number
	table_id: number
	table_name: string
	customer_name: string
	customer_phone: string
	reservation_code: string | null
	created_by_employee: string
	payment_method: PaymentMethod
	payment_status: PaymentStatus
	total_amount: number
	deposit_amount: number
	paid_amount: number
	paid_at: Date
	issued_at: Date
	item_list: ICart['item_list']
}
