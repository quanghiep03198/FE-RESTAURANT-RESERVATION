import type { Table } from '@tanstack/react-table'
import type { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { useMemo } from 'react'

import type { IUser } from '@/apis/user/types'
import useMediaQuery from '@/hooks/use-media-query'
import { FilterRemoveIcon, User, UserCog, UserStar } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import tw from 'tailwind-styled-components'
import { Tooltip } from '../customs/tooltip'
import { Button } from '../ui/button'
import { DataTableFacetedFilter, type IDataTableFacetedFilterProps } from './user-facted-filter'
import UserGlobalFilter from './user-global-filter'
import UserStatusFilter from './user-status-filter'
import UserTableRefreshButton from './user-table-refetch-button'
import { UserTableViewOptions } from './user-table-view-options'

const UserTableToolbar: React.FC<{
	table: Table<IUser>
	event$: EventEmitter<Record<string, unknown>>
}> = ({ table }) => {
	const isMobile = useMediaQuery('(max-width: 767px)')
	const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter

	const roles: IDataTableFacetedFilterProps['options'] = useMemo(
		() => [
			{
				label: 'Chủ sở hữu',
				value: 'OWNER',
				icon: UserCog
			},
			{
				label: 'Quản lý',
				value: 'MANAGER',
				icon: UserStar
			},
			{
				label: 'Thu ngân',
				value: 'CASHIER',
				icon: User
			},
			{
				label: 'Phục vụ',
				value: 'WAITER',
				icon: User
			},
			{
				label: 'Nhân viên bếp',
				value: 'KITCHEN',
				icon: User
			}
		],
		[]
	)

	return (
		<Toolbar>
			<ToolbarGroup className='md:flex-1 md:basis-full'>
				<UserGlobalFilter table={table} />
				<UserStatusFilter table={table} />
				{table.getColumn('roles') && (
					<DataTableFacetedFilter column={table.getColumn('role')} title='Vai trò' options={roles} />
				)}
				{isFiltered && (
					<Tooltip
						message='Bỏ lọc'
						triggerProps={{
							render: (
								<Button
									variant='secondary'
									size={isMobile ? 'icon' : 'default'}
									onClick={() => {
										table.resetGlobalFilter()
										table.resetColumnFilters()
									}}>
									{!isMobile && 'Bỏ lọc'} <HugeiconsIcon icon={FilterRemoveIcon} />
								</Button>
							)
						}}
						contentProps={{ hidden: !isMobile }}></Tooltip>
				)}
			</ToolbarGroup>
			<ToolbarGroup>
				<UserTableRefreshButton />
				<UserTableViewOptions table={table} />
			</ToolbarGroup>
		</Toolbar>
	)
}

const Toolbar: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-stretch justify-between`
const ToolbarGroup: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-center gap-x-1.5`

export default UserTableToolbar
