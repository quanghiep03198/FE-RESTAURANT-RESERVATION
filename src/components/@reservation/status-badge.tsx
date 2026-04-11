import { ReservationStatus } from '@/apis/reservation/constants'
import type { IReservation } from '@/apis/reservation/types'
import type { CellContext } from '@tanstack/react-table'
import React from 'react'
import { Badge } from '../ui/badge'
import { Icon, type IconProps } from '../ui/icon'

const badgeStatusMap = new Map<ReservationStatus, { icon: IconProps['name']; text: string; color: string }>([
	[ReservationStatus.PENDING, { icon: 'Loader', text: 'Chờ xác nhận', color: 'var(--muted-foreground)' }],
	[ReservationStatus.CONFIRMED, { icon: 'Check', text: 'Đã xác nhận', color: 'var(--active)' }],
	[ReservationStatus.CANCELED, { icon: 'CircleX', text: 'Đã hủy', color: 'var(--destructive)' }],
	[ReservationStatus.COMPLETED, { icon: 'Check', text: 'Chờ xác nhận', color: 'var(--success)' }]
])

const StatusBadge: React.FC<CellContext<IReservation, ReservationStatus>> = ({ getValue }) => {
	const badgeStatusData = badgeStatusMap.get(getValue())

	if (!badgeStatusData) return null

	return (
		<Badge variant='outline'>
			<Icon name={badgeStatusData.icon} stroke={badgeStatusData.color} className='size-3!' />
			{badgeStatusData.text}
		</Badge>
	)
}

export default StatusBadge
