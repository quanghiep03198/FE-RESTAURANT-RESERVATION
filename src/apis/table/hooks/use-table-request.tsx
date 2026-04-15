import useAuth from '@/apis/auth/hooks/use-auth-request'
import { CommonActions } from '@/common/constants/enums'
import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
	type MutationFunction
} from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'
import type { TCreateTableValues } from '../schemas/create-table.schema'
import type { TUpdateTableValues } from '../schemas/update-table.schema.'
import { TableService } from '../services'
import type { ITable } from '../types'

export const GET_TABLE_QUERY_KEY = 'TABLES'

export const getTableQueryOptions = (enabled: boolean) =>
	queryOptions({
		queryKey: [GET_TABLE_QUERY_KEY],
		queryFn: TableService.getAll,
		refetchOnMount: true,
		enabled,
		refetchInterval: 5000,
		select: (response) => (Array.isArray(response.metadata) ? response.metadata.filter((item) => item.is_active) : [])
	})

export const useGetTablesQuery = (prefetchOnLoader: boolean = false) => {
	const { isAuthenticated } = useAuth()
	return prefetchOnLoader
		? useSuspenseQuery(getTableQueryOptions(isAuthenticated))
		: useQuery(getTableQueryOptions(isAuthenticated))
}

export const useCreateOrUpdateTableMutation = (action: CommonActions.CREATE | CommonActions.UPDATE) => {
	const toastRef = useRef<string | number | null>(null)
	const queryClient = useQueryClient()

	const mutationConfigFactory: Map<
		CommonActions.CREATE | CommonActions.UPDATE,
		{ handler: MutationFunction<unknown, TCreateTableValues | TUpdateTableValues>; message: string }
	> = new Map([
		[
			CommonActions.CREATE,
			{
				handler: async (payload: TUpdateTableValues) => await TableService.insertOne(payload),
				message: 'Thêm danh mục thành công'
			}
		],
		[
			CommonActions.UPDATE,
			{
				handler: async ({ slug, ...payload }: TUpdateTableValues & Pick<ITable, 'slug'>) =>
					await TableService.updateOneBySlug(slug, payload),
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
			queryClient.invalidateQueries({ queryKey: [GET_TABLE_QUERY_KEY] })
			toast.success(currentConfig?.message, { id: toastRef.current })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: toastRef.current })
		}
	})
}

export const useDeleteTableMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (slug: string) => TableService.deleteOneBySlug(slug),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [GET_TABLE_QUERY_KEY] })
			toast.success('Đã xóa bàn ăn thành công', { id: 'delete-table' })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: 'delete-table' })
		}
	})
}
