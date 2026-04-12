import { ReservationStatus } from '@/apis/reservation/constants'
import type { IReservation } from '@/apis/reservation/types'
import type { CellContext } from '@tanstack/react-table'
import React from 'react'
import { Badge } from '../ui/badge'
import { Icon, type IconProps } from '../ui/icon'

export const reservationStatusMap = new Map<
	ReservationStatus,
	{ icon: IconProps['name']; label: string; color: string }
>([
	[ReservationStatus.PENDING, { icon: 'Loader', label: 'Chờ xác nhận', color: 'var(--muted-foreground)' }],
	[ReservationStatus.CONFIRMED, { icon: 'Check', label: 'Đã xác nhận', color: 'var(--active)' }],
	[ReservationStatus.CANCELED, { icon: 'CircleX', label: 'Đã hủy', color: 'var(--destructive)' }],
	[ReservationStatus.COMPLETED, { icon: 'CircleCheckBig', label: 'Đã hoàn thành', color: 'var(--success)' }]
])

const StatusBadge: React.FC<CellContext<IReservation, ReservationStatus>> = ({ getValue }) => {
	const badgeStatusData = reservationStatusMap.get(getValue())

	if (!badgeStatusData) return null

	return (
		<Badge variant='outline'>
			<Icon name={badgeStatusData.icon} stroke={badgeStatusData.color} className='size-3!' />
			{badgeStatusData.label}
		</Badge>
	)
}

export default StatusBadge
