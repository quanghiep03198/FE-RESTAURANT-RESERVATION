import type { ICart } from '@/apis/cart/types'
import type { TableSessionStatus } from '../constants'

export interface ITableSession extends IBaseEntity {
	table_id: number
	opened_by_employee: string
	closed_by_employee?: string
	opened_at: string
	closed_at?: string
	status: TableSessionStatus
	reservation_code: string | null
	cart_orders: Pick<ICart, 'id'>[]
}
