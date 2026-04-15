import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'
import type { ICategory } from '@/apis/menu/types'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { DataGrid } from '../shared/data-grid'
import TableCellText from '../shared/data-grid/components/table-cell-text'
import { ROW_ACTIONS_COLUMN_ID } from '../shared/data-grid/constants'
import { Badge } from '../ui/badge'
import { Icon, type IconProps } from '../ui/icon'
import CategoryActionDropdown from './category-action-dropdown'
import CategoryTableToolbar from './category-table-toolbar'

const CategoryTable: React.FC = () => {
	const { data, isLoading } = useGetCategoriesQuery()

	const columnHelper = createColumnHelper<ICategory>()

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', {
				header: 'Tên danh mục',
				enableHiding: false,
				enableColumnFilter: true,
				enableMultiSort: true,
				enableSorting: true,
				cell: TableCellText
			}),
			columnHelper.accessor('description', {
				header: 'Mô tả',
				enableHiding: false,
				enableColumnFilter: true,
				enableMultiSort: true,
				enableSorting: true,
				cell: TableCellText
			}),
			columnHelper.accessor('total_dishes_qty', {
				header: 'Số lượng món',
				enableHiding: false,
				enableColumnFilter: true,
				enableMultiSort: true,
				enableSorting: true,
				cell: ({ getValue }) => <Badge>{getValue()} món</Badge>
			}),
			columnHelper.accessor('is_active', {
				id: 'is_active',
				header: 'Trạng thái',
				enableHiding: true,
				cell: ({ getValue }) => {
					const value = getValue()

					const badgeHelper: {
						icon: IconProps['name']
						text: string
					} = value
						? { icon: 'CircleCheckBig', text: 'Đang phục vụ' }
						: { icon: 'CircleMinus', text: 'Đã ngừng kinh doanh' }

					return (
						<Badge
							variant='ghost'
							className='justify-center gap-x-2 rounded-l-full rounded-r-full whitespace-nowrap'>
							<Icon
								aria-current={value}
								name={badgeHelper?.icon as IconProps['name']}
								className='stroke-muted-foreground aria-current:stroke-success'
							/>
							{badgeHelper?.text}
						</Badge>
					)
				},
				enableSorting: true,
				enableColumnFilter: true,
				enableGlobalFilter: true,
				enableResizing: true,
				filterFn: 'equals'
			}),
			columnHelper.display({
				id: ROW_ACTIONS_COLUMN_ID,
				header: 'Thao tác',
				meta: { align: 'center' },
				size: 60,
				maxSize: 60,
				enableHiding: false,
				cell: CategoryActionDropdown
			})
		],
		[]
	)

	return (
		<DataGrid
			columns={columns}
			data={data}
			loading={isLoading}
			containerProps={{
				className: 'xl:h-[calc(var(--outlet-wrapper-height)-9rem)] h-80'
			}}
			virtualizerOptions={{ estimateSize: 56 }}
			toolbarProps={{
				override: true,
				render: CategoryTableToolbar
			}}
		/>
	)
}

export default CategoryTable
