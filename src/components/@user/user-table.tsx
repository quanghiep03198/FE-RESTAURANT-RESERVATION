import type { IUser } from '@/apis/user/types'

import { useGetUserListQuery } from '@/apis/user/hooks/use-user-request'
import { RecordStatus } from '@/common/constants/enums'
import { CircleCheck, CircleLockMinusIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { DataGrid } from '../shared/data-grid'
import TableCellText from '../shared/data-grid/components/table-cell-text'
import { ROW_ACTIONS_COLUMN_ID } from '../shared/data-grid/constants'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Typography } from '../ui/typography'
import RoleBadge from './role-badge'
import UserActionDropdown from './user-action-dropdown'
import UserTableToolbar from './user-table-toolbar'

const UserTable: React.FC = () => {
	const { data, isLoading } = useGetUserListQuery()

	const columnHelper = createColumnHelper<IUser>()

	const columns = useMemo(
		() => [
			columnHelper.accessor('full_name', {
				header: 'Họ tên & Email',
				cell: ({ getValue, row }) => {
					return (
						<div className='grid grid-cols-[auto_1fr] items-center gap-x-2'>
							<Avatar className='col-start-1 row-span-2'>
								<AvatarImage src={row.original.avatar} alt={row.original.full_name} />
								<AvatarFallback>G</AvatarFallback>
							</Avatar>
							<Typography variant='small' className='col-start-2 row-start-1'>
								{getValue()}
							</Typography>
							<Typography variant='small' color='muted' className='col-start-2 row-start-2'>
								{row.original.email}
							</Typography>
						</div>
					)
				}
			}),
			columnHelper.accessor('phone', {
				header: 'Số điện thoại',
				cell: TableCellText
			}),
			columnHelper.accessor('role.code', {
				id: 'role',
				header: 'Vai trò',
				cell: ({ getValue }) => <RoleBadge value={getValue()} />,
				filterFn: 'arrIncludesSome',
				enableSorting: true,
				enableColumnFilter: true,
				enableGlobalFilter: true,
				enableResizing: true,
				enableHiding: true
			}),
			columnHelper.accessor('created_at', {
				header: 'Ngày đăng ký',
				cell: ({ getValue }) => format(new Date(getValue()), 'dd/MM/yyyy')
			}),
			columnHelper.accessor('is_active', {
				id: 'is_active',
				header: 'Trạng thái',
				enableHiding: true,
				cell: ({ getValue }) => {
					const value = getValue()

					const badgeValuesMap = new Map<RecordStatus, { icon: IconSvgElement; text: string }>([
						[RecordStatus.ACTIVE, { icon: CircleCheck, text: 'Đang hoạt động' }],
						[RecordStatus.INACTIVE, { icon: CircleLockMinusIcon, text: 'Tạm khóa' }]
					])

					const isActive = value === RecordStatus.ACTIVE
					return (
						<Badge
							variant='outline'
							aria-current={isActive}
							className='justify-center gap-x-2 rounded-l-full rounded-r-full whitespace-nowrap'>
							<HugeiconsIcon
								icon={badgeValuesMap.get(value)?.icon}
								className='stroke-muted-foreground aria-current:stroke-success'
							/>
							{badgeValuesMap.get(value)?.text}
						</Badge>
					)
				},
				enableSorting: true,
				enableColumnFilter: true,
				enableGlobalFilter: true,
				enableResizing: true
			}),
			columnHelper.display({
				id: ROW_ACTIONS_COLUMN_ID,
				meta: { align: 'center' },
				size: 60,
				maxSize: 60,
				enableHiding: false,
				cell: UserActionDropdown
			})
		],

		[]
	)

	return (
		<DataGrid
			columns={columns}
			data={data}
			loading={isLoading}
			border='bottom-only'
			defaultFilterOpen={false}
			containerProps={{
				style: { height: 'calc(var(--outlet-wrapper-height) - 8rem)' }
			}}
			virtualizerOptions={{ estimateSize: 48 }}
			toolbarProps={{
				override: true,
				render: UserTableToolbar
			}}
		/>
	)
}

export default UserTable
