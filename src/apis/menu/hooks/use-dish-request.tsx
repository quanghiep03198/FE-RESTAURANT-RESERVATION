import { CommonActions } from '@/common/constants/enums'
import { useMutation, useQueryClient, type MutationFunction } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'
import type { TCreateDishValues } from '../schemas/create-dish.schema'
import type { TUpdateDishValues } from '../schemas/update-dish.schema'
import { DishService } from '../services'
import type { IDish } from '../types'
import { GET_CATEGORY_QUERY } from './use-category-request'

export const GET_DISHES_QUERY_KEY = 'DISHES'

export const useCreateOrUpdateDish = (action: CommonActions.CREATE | CommonActions.UPDATE) => {
	const toastRef = useRef<string | number | null>(null)
	const queryClient = useQueryClient()

	const mutationConfigFactory: Map<
		CommonActions.CREATE | CommonActions.UPDATE,
		{ handler: MutationFunction<unknown, TCreateDishValues | TUpdateDishValues>; message: string }
	> = new Map([
		[
			CommonActions.CREATE,
			{
				handler: async (payload: TCreateDishValues) => await DishService.insertOne(payload),
				message: 'Thêm danh mục thành công'
			}
		],
		[
			CommonActions.UPDATE,
			{
				handler: async ({ slug, ...payload }: TUpdateDishValues & Pick<IDish, 'slug'>) =>
					await DishService.updateOneBySlug(slug, payload),
				message: 'Đã cập nhật thành công'
			}
		]
	])

	const currentConfig = mutationConfigFactory.get(action)

	return useMutation({
		mutationFn: currentConfig?.handler,
		onMutate: () => {
			toastRef.current = toast.loading('Đang xử lý ...')
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [GET_CATEGORY_QUERY] })
			toast.success(currentConfig?.message, { id: toastRef.current })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: toastRef.current })
		}
	})
}
