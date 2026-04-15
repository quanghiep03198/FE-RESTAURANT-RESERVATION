import useAuth from '@/apis/auth/hooks/use-auth-request'
import type { TUserRoleCode } from '@/apis/user/types'
import PermissionDenied from '@/components/exceptions/permission-denied'

export const RoleGuard: React.FC<React.PropsWithChildren & { authorizedRoles: TUserRoleCode[] | '*' }> = ({
	children,
	authorizedRoles
}) => {
	const { user } = useAuth()
	const isAccessible = user && authorizedRoles.includes(user.role?.code)
	authorizedRoles !== '*'

	if (!isAccessible) return <PermissionDenied />

	return children
}
