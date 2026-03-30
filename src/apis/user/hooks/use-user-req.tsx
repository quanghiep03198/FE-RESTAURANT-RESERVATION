import generateAvatar from '@/common/libs/generate-avatar'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { TUpdateUserSchema } from '../schemas/udpate-user.schema'
import { UserService } from '../services'
import type { IUser } from '../types'

export const GET_USER_LIST_QUERY_KEY = Symbol('GET_USER_LIST_QUERY_KEY')

export const useGetUserListQuery = () => {
	return useQuery({
		queryKey: [GET_USER_LIST_QUERY_KEY.valueOf()],
		queryFn: UserService.getUsers,
		select: (response) =>
			Array.isArray(response.metadata)
				? response.metadata.map((item) => ({
						...item,
						role: item.role?.code,
						avatar: generateAvatar({ name: item.full_name })
					}))
				: []
	})
}

export const useUpdateUserStatusMutation = () => {
	return useMutation({
		mutationFn: async ({ id, ...update }: TUpdateUserSchema & Pick<IUser, 'id'>) =>
			await UserService.updateUser(id, update)
	})
}
