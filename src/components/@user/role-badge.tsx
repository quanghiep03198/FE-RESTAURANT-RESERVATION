import type { TUserRoleCode } from '@/apis/user/types'
import React from 'react'
import { Badge } from '../ui/badge'
import { Icon, type IconProps } from '../ui/icon'

const RoleBadge: React.FC<{ value: TUserRoleCode }> = ({ value }) => {
	const roleData: { icon: IconProps['name']; name: string } = (() => {
		switch (value) {
			case 'OWNER':
				return { icon: 'UserStar', name: 'Chủ sở hữu' }
			case 'MANAGER':
				return { icon: 'UserCheck', name: 'Quản lý' }
			case 'WAITER':
				return { icon: 'User', name: 'Phục vụ' }
			case 'CASHIER':
				return { icon: 'User', name: 'Thu ngân' }
			case 'KITCHEN':
				return { icon: 'User', name: 'Nhân viên bếp' }
		}
	})()

	return (
		<Badge variant='secondary' className='flex-nowrap whitespace-nowrap'>
			<Icon name={roleData?.icon} size={14} strokeWidth={2} />
			{roleData?.name}
		</Badge>
	)
}

export default RoleBadge
