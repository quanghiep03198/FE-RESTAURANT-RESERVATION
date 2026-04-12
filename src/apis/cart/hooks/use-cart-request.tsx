import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import type { TUpdateCartValues } from '../schemas/update-cart.schema'
import { CartService } from '../services'

const GET_CART_BY_TABLE_KEY = 'CART_BY_TABLE'

export const getCartByTableQueryOptions = (tableId: number) => {
	return queryOptions({
		queryKey: [GET_CART_BY_TABLE_KEY, tableId],
		queryFn: async () => await CartService.getCartByTableId(tableId),
		enabled: Boolean(tableId),
		select: (response) => response.metadata
	})
}

export const useGetCartByTableQuery = (tableId?: number) => {
	return useQuery(getCartByTableQueryOptions(tableId))
}

export const useUpdateCartMutation = () => {
	return useMutation({
		mutationFn: ({ cart_id, ...payload }: TUpdateCartValues & { cart_id: number }) =>
			CartService.updateCartByTableId(cart_id, payload)
	})
}

export const useInvalidateQuery = () => {}
