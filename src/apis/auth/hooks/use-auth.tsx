import { useAuthStore } from '@/apis/auth/stores'
import { type QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { isNil } from 'lodash-es'
import { toast } from 'sonner'
import { AuthService } from '../services'

/**
 * @summary Custom hook that provides authentication-related functionality.
 */
export default function useAuth() {
	const authStore = useAuthStore()
	const queryClient = useQueryClient()

	const { mutateAsync: logout } = useMutation({
		mutationFn: AuthService.logout,
		onMutate: () => {
			const queryCache = queryClient.getQueryCache()
			const cancelledQueryKeys = queryCache.getAll().reduce<QueryKey>((accumulator, currentQuery) => {
				if (currentQuery.state.status === 'pending')
					return [...accumulator, ...currentQuery.queryKey.filter((key) => !!key)]
				else return accumulator
			}, [])
			queryClient.cancelQueries({ queryKey: cancelledQueryKeys })
			return toast.loading('Đang xử lý ...')
		},
		onSettled: (_data, _error, _variable, context) => {
			AuthService.logout()
			toast.success('Đăng nhập thành công', { id: context })
		}
	})

	const isAuthenticated = !isNil(authStore.accessToken)

	return { ...authStore, isAuthenticated, logout }
}
