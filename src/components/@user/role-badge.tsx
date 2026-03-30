import type { TUserRoleCode } from '@/apis/user/types'
import { User, UserCog, UserStar } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import React from 'react'
import { Badge } from '../ui/badge'

const RoleBadge: React.FC<{ data: TUserRoleCode }> = ({ data }) => {
	const roleData: { icon: IconSvgElement; name: string } = (() => {
		switch (data) {
			case 'OWNER':
				return { icon: UserCog, name: 'Chủ sở hữu' }
			case 'MANAGER':
				return { icon: UserStar, name: 'Quản lý' }
			case 'WAITER':
				return { icon: User, name: 'Phục vụ' }
			case 'CASHIER':
				return { icon: User, name: 'Thu ngân' }
			case 'KITCHEN':
				return { icon: User, name: 'Nhân viên bếp' }
		}
	})()

	return (
		<Badge variant='secondary' className='flex-nowrap whitespace-nowrap'>
			<HugeiconsIcon icon={roleData.icon} className='w-4.5' />
			{roleData.name}
		</Badge>
	)
}

export default RoleBadge
