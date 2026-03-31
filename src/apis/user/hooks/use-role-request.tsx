import { useQuery } from '@tanstack/react-query'
import { RoleService } from '../services'

const GET_ROLE_QUERY_KEY = 'ROLES'

export const useGetRolesQuery = () => {
	return useQuery({
		queryKey: [GET_ROLE_QUERY_KEY],
		queryFn: RoleService.getRoles,
		select: (res) => (Array.isArray(res.metadata) ? res.metadata : [])
	})
}
