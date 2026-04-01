import { CommonActions } from '@/common/constants/enums'
import { useMutation, useQuery, useQueryClient, type MutationFunction } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'
import type { TCreateCategoryValues } from '../schemas/create-category.schema'
import type { TUpdateCategoryValues } from '../schemas/update-category.schema'
import { CategoryService } from '../services'
import type { ICategory } from '../types'

export const GET_CATEGORIES_QUERY = 'DISH_CATEGORIES'

export const useGetCategoriesQuery = () => {
	return useQuery({
		queryKey: [GET_CATEGORIES_QUERY],
		queryFn: CategoryService.getAll,
		select: (response) =>
			Array.isArray(response.metadata)
				? response.metadata.map((item) => ({
						...item,
						total_dishes_qty: item.dishes.filter((item) => item.is_active).length
					}))
				: []
	})
}

export const useCreateOrUpdateCategoryMutation = (action: CommonActions.CREATE | CommonActions.UPDATE | null) => {
	const toastRef = useRef<string | number | null>(null)
	const queryClient = useQueryClient()

	const mutationConfigFactory: Map<
		CommonActions.CREATE | CommonActions.UPDATE,
		{ handler: MutationFunction<unknown, TCreateCategoryValues | TUpdateCategoryValues>; message: string }
	> = new Map([
		[
			CommonActions.CREATE,
			{
				handler: async (payload: TUpdateCategoryValues) => await CategoryService.insertOne(payload),
				message: 'Thêm danh mục thành công'
			}
		],
		[
			CommonActions.UPDATE,
			{
				handler: async ({ slug, ...payload }: TUpdateCategoryValues & Pick<ICategory, 'slug'>) =>
					await CategoryService.updateOneBySlug(slug, payload),
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
			queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY] })
			toast.success(currentConfig?.message, { id: toastRef.current })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: toastRef.current })
		}
	})
}

export const useUpdateCategoryStatusMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ slug, ...update }: Pick<TUpdateCategoryValues, 'is_active'> & Pick<ICategory, 'slug'>) =>
			await CategoryService.updateOneBySlug(slug, update),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY] })
		}
	})
}
