import useAuth from '@/apis/auth/hooks/use-auth-request'
import type { TUserRoleCode } from '@/apis/user/types'
import { cn } from '@/common/utils/cn'
import { Icon } from '@/components/ui/icon'
import React from 'react'
import { toast } from 'sonner'

type VisibilityMode = 'mask' | 'invisible' | 'fallback'

type RoleBaseAccessControlVariant =
	| {
			mode?: Exclude<VisibilityMode, 'fallback'>
			fallbackComponent?: undefined
	  }
	| { mode?: Extract<VisibilityMode, 'fallback'>; fallbackComponent: Required<React.ReactNode> }

type RoleBaseAccessControlProps = React.PropsWithChildren &
	RoleBaseAccessControlVariant & {
		authorizedRoles: TUserRoleCode[]
		classNames?: {
			wrapper?: string
			innerWrapper?: string
		}
	}

export const ACTION_RESTRICTED_TOAST_ID = 'action-restricted-toast'

const RoleBaseAccessControl: React.FC<RoleBaseAccessControlProps> = ({
	children,
	classNames,
	mode = 'mask',
	authorizedRoles,
	fallbackComponent
}) => {
	const { user } = useAuth()
	const isAccessible = user && authorizedRoles.includes(user.role?.code)

	const preventActionIfUnauthorized = (e: React.MouseEvent) => {
		if (!isAccessible) {
			e.preventDefault()
			e.stopPropagation()
			toast.warning('Bạn chưa được cấp quyền thực hiện thao tác này', {
				id: ACTION_RESTRICTED_TOAST_ID,
				dismissible: true,
				duration: 5000
			})
		}
	}

	const Component: Record<VisibilityMode, React.ReactNode> = {
		mask: (
			<div
				aria-disabled={!isAccessible}
				className={cn('group/rbac relative', classNames?.wrapper)}
				onClick={preventActionIfUnauthorized}
				onContextMenu={preventActionIfUnauthorized}>
				{!isAccessible && (
					<div
						data-slot='rbac-mask'
						className='ease absolute inset-0 z-20 flex items-center justify-center gap-x-2 opacity-0 transition-opacity duration-200 group-hover/rbac:opacity-100 group-aria-disabled/rbac:cursor-not-allowed group-aria-disabled/rbac:select-none'>
						<Icon
							name='Lock'
							className='group-hover/rbac:animate-in group-hover/rbac:zoom-in-0 ease-in-out group-hover/rbac:duration-200'
						/>
					</div>
				)}
				<div
					data-slot='rbac-element'
					className={cn(
						'ease opacity-100 transition-opacity duration-200 group-hover/rbac:opacity-15',
						classNames?.innerWrapper
					)}>
					{children}
				</div>
			</div>
		),
		invisible: null,
		fallback: fallbackComponent
	}

	return isAccessible ? children : Component[mode]
}

export default RoleBaseAccessControl
