import { array, nativeEnum, number, object } from 'zod'
import { CartItemType } from '../constants'

export const baseCartSchema = object({
	table_id: number(),
	session_id: number(),
	items: array(
		object({
			item_type: nativeEnum(CartItemType),
			item_id: number({ message: 'Vui lòng chọn 1 món/combo' }),
			quantity: number({ message: 'Vui lòng nhập số lượng' }).min(1, { message: 'Số lượng tối thiểu là 1' })
		})
	)
})
