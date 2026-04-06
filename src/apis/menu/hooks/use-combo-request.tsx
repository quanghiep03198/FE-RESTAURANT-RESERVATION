import { CommonActions } from '@/common/constants/enums'
import { getStorageUrl } from '@/common/utils/get-storage-url.ts'
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
	type MutationFunction
} from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { useRef } from 'react'
import { toast } from 'sonner'
import type { TCreateComboValues } from '../schemas/create-combo.schema'
import type { TUpdateComboValues } from '../schemas/update-combo.schema.ts'
import { ComboService } from '../services'
import type { ICombo } from '../types'

export const GET_COMBO_QUERY_KEY = 'COMBOS'

export const getCombosQueryOptions = () =>
	queryOptions({
		queryKey: [GET_COMBO_QUERY_KEY],
		queryFn: ComboService.getAll,
		select: (response) =>
			Array.isArray(response.metadata)
				? response.metadata
						.filter((item) => item.is_active)
						.map((item) => ({
							...item,
							...(item.combo_image &&
								({
									combo_image: {
										...item.combo_image,
										url: getStorageUrl(item.combo_image.url)
									} satisfies IImageMetadata
								} satisfies Pick<ICombo, 'combo_image'>)),
							start_time: format(parse(item.start_time, 'HH:mm:ss', new Date()), 'HH:mm') as TTime,
							end_time: format(parse(item.end_time, 'HH:mm:ss', new Date()), 'HH:mm') as TTime
						}))
				: []
	})

export const useGetCombosQuery = () => {
	return useSuspenseQuery(getCombosQueryOptions())
}

export const useCreateOrUpdateComboMutation = (action: CommonActions.CREATE | CommonActions.UPDATE) => {
	const toastRef = useRef<string | number | null>(null)
	const queryClient = useQueryClient()

	const mutationConfigFactory: Map<
		CommonActions.CREATE | CommonActions.UPDATE,
		{ handler: MutationFunction<unknown, TCreateComboValues | TUpdateComboValues>; message: string }
	> = new Map([
		[
			CommonActions.CREATE,
			{
				handler: async (payload: TCreateComboValues) => await ComboService.insertOne(payload),
				message: 'Thêm danh mục thành công'
			}
		],
		[
			CommonActions.UPDATE,
			{
				handler: async ({ slug, ...payload }: TUpdateComboValues & Pick<ICombo, 'slug'>) =>
					await ComboService.updateOneBySlug(slug, payload),
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
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey.some((key) => key === GET_COMBO_QUERY_KEY)
			})
			toast.success(currentConfig?.message, { id: toastRef.current })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: toastRef.current })
		}
	})
}

export const useDeleteComboMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ComboService.deleteOneBySlug,
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey.some((key) => key === GET_COMBO_QUERY_KEY)
			})
			return toast.success('Combo đã được xóa')
		},
		onError: () => toast.error('Đã có lỗi xảy ra!')
	})
}
