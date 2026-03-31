import { CommonActions } from '@/common/constants/enums'
import generateAvatar from '@/common/libs/generate-avatar'
import { useMutation, useQuery, useQueryClient, type MutationFunction } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'
import type { TCreateUserValues } from '../schemas/create-user.schema'
import type { TUpdateUserValues } from '../schemas/update-user.schema'
import { UserService } from '../services'
import type { IUser } from '../types'

export const GET_USER_LIST_QUERY_KEY = 'USERS'

export const useGetUserListQuery = () => {
	return useQuery({
		queryKey: [GET_USER_LIST_QUERY_KEY],
		queryFn: UserService.getUsers,
		select: (response) => {
			const data = Array.isArray(response.metadata)
				? response.metadata.map<IUser>((item) => ({
						...item,
						avatar: generateAvatar({ name: item.full_name })
					}))
				: []

			return data
		}
	})
}

export const useUpdateUserStatusMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, ...update }: TUpdateUserValues & Pick<IUser, 'id'>) =>
			await UserService.updateUser(id, update),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [GET_USER_LIST_QUERY_KEY] })
		}
	})
}

export const useCreateOrUpdateUserMutataion = (action: CommonActions.CREATE | CommonActions.UPDATE | null) => {
	const toastRef = useRef<string | number | null>(null)
	const queryClient = useQueryClient()

	const mutationConfigFactory: Map<
		CommonActions.CREATE | CommonActions.UPDATE,
		{ handler: MutationFunction<unknown, TCreateUserValues | TUpdateUserValues>; message: string }
	> = new Map([
		[
			CommonActions.CREATE,
			{
				handler: async (payload: TCreateUserValues) => await UserService.createUser(payload),
				message: 'Thêm mới người dùng thành công'
			}
		],
		[
			CommonActions.UPDATE,
			{
				handler: async ({ id, ...payload }: TUpdateUserValues & Pick<IUser, 'id'>) =>
					await UserService.updateUser(id, payload),
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
			queryClient.invalidateQueries({ queryKey: [GET_USER_LIST_QUERY_KEY] })
			toast.success(currentConfig?.message, { id: toastRef.current })
		},
		onError: () => {
			toast.error('Đã có lỗi xảy ra !', { id: toastRef.current })
		}
	})
}
