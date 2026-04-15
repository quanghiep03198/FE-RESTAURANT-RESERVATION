import { useGetTableSessionsQuery } from '@/apis/table-session/hooks/use-table-session-request'
import { useGetTablesQuery } from '@/apis/table/hooks/use-table-request'
import type { ITableCardData } from '@/apis/table/types'
import { useMemo } from 'react'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'
import TableCard from './table-card'
import TableFormDialogTrigger from './table-form-dialog-trigger'
import TableIndicators from './table-indicators'

const TablesMap: React.FC = () => {
	const { data: tables, isLoading: isLoadingTables } = useGetTablesQuery(false)
	const { data: tableSessions, isLoading: isLoadingTableSession } = useGetTableSessionsQuery()

	const tableData = useMemo(() => {
		if (!tables) return []
		return tables.map((table) => {
			const tableSession = tableSessions?.find((session) => session?.table_id === table?.id)

			return {
				...table,
				sesssion_id: tableSession?.id,
				reservation_code: table?.reservation?.reservation_code,
				cart_id: tableSession?.cart_orders?.[0]?.id
			} as unknown as ITableCardData
		})
	}, [tables, tableSessions])

	const isLoading = isLoadingTables || isLoadingTableSession

	console.table(tableData)

	return (
		<section className='bg-card scrollbar-none! relative flex h-full flex-1 flex-col space-y-3 overflow-scroll rounded-lg shadow-md'>
			<div className='bg-card sticky top-0 z-20 flex items-center gap-x-6 border-b p-4 xl:px-6'>
				<TableIndicators />
				<TableFormDialogTrigger />
			</div>

			<div className='grid h-full auto-rows-max grid-cols-4 gap-4 p-4 sm:max-lg:[zoom:0.75] xl:p-6'>
				{isLoading ? (
					Array.from({ length: 16 }, (_, index) => <Skeleton key={index} className='h-36' />)
				) : Array.isArray(tableData) && tableData.length > 0 ? (
					tableData
						.toSorted((a, b) => a.sort_order - b.sort_order)
						.toSorted((a, b) =>
							a.name.slice(1, -1).localeCompare(b.name.slice(1, -1), new Intl.Locale('vi-VN', { numeric: true }))
						)
						.map((table) => <TableCard key={table?.id} data={table} />)
				) : (
					<Empty>
						<EmptyMedia variant='icon'>
							<Icon name='Grid2x2' size={48} className='text-muted-foreground' />
						</EmptyMedia>
						<EmptyContent>
							<EmptyTitle>Chưa có bàn nào</EmptyTitle>
							<EmptyDescription>
								Hiện tại chưa có bàn nào được thêm vào hệ thống. Vui lòng thêm bàn mới để bắt đầu quản lý đặt
								bàn và tình trạng
							</EmptyDescription>
						</EmptyContent>
					</Empty>
				)}
			</div>
		</section>
	)
}

export default TablesMap
