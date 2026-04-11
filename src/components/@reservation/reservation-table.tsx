import { useGetReservationsQuery } from '@/apis/reservation/hooks/use-reservation-request'
import type { IReservation } from '@/apis/reservation/types'
import { formatCurrency } from '@/common/utils/format-currency'
import { formatPhoneNumber } from '@/common/utils/format-phone-number'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { DataGrid } from '../shared/data-grid'
import { ROW_ACTIONS_COLUMN_ID } from '../shared/data-grid/constants'
import { Icon } from '../ui/icon'
import { Typography } from '../ui/typography'
import ReservationActionsDropdownMenu from './actions-dropdown-menu'
import StatusBadge from './status-badge'
import UserTableCell from './user-table-cell'

const ReservationTable: React.FC = () => {
	const { data, isLoading } = useGetReservationsQuery()

	console.log('data', data)

	const columnHelper = createColumnHelper<IReservation>()

	const columns = useMemo(
		() => [
			columnHelper.accessor('reservation_code', {
				header: 'Mã đặt bàn',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) => (
					<Typography variant='small' className='font-medium'>
						{getValue()}
					</Typography>
				)
			}),
			columnHelper.accessor('customer_name', {
				header: 'Họ tên',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) => <UserTableCell name={getValue()} />
			}),
			columnHelper.accessor('customer_phone', {
				header: 'Số điện thoại',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) => (
					<Typography variant='small' className='inline-flex items-center gap-x-2'>
						<Icon name='Smartphone' stroke='var(--muted-foreground)' />
						{formatPhoneNumber(getValue())}
					</Typography>
				)
			}),
			columnHelper.accessor('reservation_time', {
				header: 'Thời gian đến dự kiến',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) => (
					<Typography variant='small' className='inline-flex items-center gap-x-2'>
						<Icon name='Clock' stroke='var(--muted-foreground)' />
						{format(getValue(), 'dd/MM/yyyy HH:mm')}{' '}
					</Typography>
				)
			}),
			columnHelper.accessor('hold_end_time', {
				header: 'Thời gian kết thúc đặt chỗ',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) => (
					<Typography variant='small' className='line-clamp-1 inline-flex items-center gap-x-2'>
						<Icon name='Clock' stroke='var(--muted-foreground)' />
						{format(getValue(), 'dd/MM/yyyy HH:mm')}{' '}
					</Typography>
				)
			}),
			columnHelper.accessor('deposit_amount', {
				header: 'Tiền đặt trước',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) =>
					getValue() ? (
						formatCurrency(getValue())
					) : (
						<Typography variant='small' color='muted' className='inline-flex items-center gap-x-2'>
							<Icon name='HandCoins' stroke='var(--muted-foreground)' />
							Chưa thanh toán
						</Typography>
					)
			}),
			columnHelper.accessor('status', {
				header: 'Trạng thái ',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: StatusBadge
			}),
			columnHelper.accessor('created_by_employee', {
				header: 'Nhân viên tạo',
				enableSorting: true,
				enableGlobalFilter: true,
				enableHiding: false,
				cell: ({ getValue }) => <UserTableCell name={getValue()} />
			}),
			columnHelper.display({
				id: ROW_ACTIONS_COLUMN_ID,
				header: 'Thao tác',
				size: 60,
				maxSize: 60,
				cell: ReservationActionsDropdownMenu
			})
		],
		[]
	)

	return (
		<DataGrid
			data={data}
			columns={columns}
			loading={isLoading}
			virtualizerOptions={{ estimateSize: 44 }}
			containerProps={{ className: 'h-[calc(var(--outlet-wrapper-height)-6rem)]' }}
		/>
	)
}

export default ReservationTable
