import { useGetRolesQuery } from '@/apis/user/hooks/use-role-request'
import type { IUser, TUserRoleCode } from '@/apis/user/types'
import useMediaQuery from '@/hooks/use-media-query'
import type { Column, Table } from '@tanstack/react-table'
import type { EventEmitter } from 'ahooks/lib/useEventEmitter'
import { useMemo } from 'react'
import tw from 'tailwind-styled-components'
import { Tooltip } from '../customs/tooltip'
import GlobalFilterInput from '../shared/data-grid/components/global-filter-input'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'

import {
	DataTableFacetedFilter,
	type IDataTableFacetedFilterProps
} from '../shared/data-grid/components/table-faceted-filter'
import UserStatusFilter from './user-status-filter'
import UserTableRefetchButton from './user-table-refetch-button'
import { UserTableViewOptions } from './user-table-view-options'

const getRoleIcon = (code: TUserRoleCode) => {
	switch (code) {
		case 'OWNER':
			return 'UserStar'
		case 'MANAGER':
			return 'UserCheck'
		default:
			return 'User'
	}
}

const UserTableToolbar: React.FC<{
	table: Table<IUser>
	event$: EventEmitter<Record<string, unknown>>
}> = ({ table }) => {
	const isMobile = useMediaQuery('(max-width: 767px)')
	const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter
	const { data } = useGetRolesQuery()

	const roles: IDataTableFacetedFilterProps<IUser, TUserRoleCode>['options'] = useMemo(() => {
		return Array.isArray(data)
			? data.map((role) => ({
					label: role.name,
					value: role.code,
					icon: getRoleIcon(role.code)
				}))
			: []
	}, [data])

	return (
		<Toolbar>
			<ToolbarGroup className='md:flex-1 md:basis-full'>
				<GlobalFilterInput table={table} />
				<UserStatusFilter table={table} />
				{table.getColumn('role') && (
					<DataTableFacetedFilter
						column={table.getColumn('role') as Column<IUser, TUserRoleCode>}
						title='Vai trò'
						options={roles}
					/>
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
									{!isMobile && 'Bỏ lọc'} <Icon name='FunnelX' />
								</Button>
							)
						}}
						contentProps={{ hidden: !isMobile }}></Tooltip>
				)}
			</ToolbarGroup>
			<ToolbarGroup>
				<UserTableRefetchButton />
				<UserTableViewOptions table={table} />
			</ToolbarGroup>
		</Toolbar>
	)
}

const Toolbar: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-stretch justify-between gap-x-1.5`
const ToolbarGroup: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-center gap-x-1.5`

export default UserTableToolbar
