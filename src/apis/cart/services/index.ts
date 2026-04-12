import { axiosInstance } from '@/configs/axios.config'
import type { TCreateCartValues } from '../schemas/create-cart.schema'
import type { TUpdateCartValues } from '../schemas/update-cart.schema'
import type { ICart } from '../types'

export class CartService {
	/**
	 * @deprecated
	 * @param payload
	 * @returns
	 */
	public static async createCart(payload: TCreateCartValues) {
		return await axiosInstance.post<unknown, ResponseBody<ICart>, TCreateCartValues>('/table/cart-orders', payload)
	}

	public static async getCartByTableId(tableId: number) {
		return await axiosInstance.get<unknown, ResponseBody<ICart>, void>(
			`/table/cart-orders/current-by-table/${tableId}`
		)
	}

	public static async updateCartByTableId(cartId: number, payload: TUpdateCartValues) {
		return await axiosInstance.patch<unknown, ResponseBody<ICart>, TUpdateCartValues>(
			`/table/cart-orders/${cartId}`,
			payload
		)
	}
}
