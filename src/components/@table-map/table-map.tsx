import { useGetTableQuery } from '@/apis/table/hooks/use-table-request'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'
import TableCard from './table-card'
import TableFormDialogTrigger from './table-form-dialog-trigger'
import TableIndicators from './table-indicators'

const TableMap: React.FC = () => {
	const { data, isLoading } = useGetTableQuery()

	return (
		<section className='bg-card scrollbar-none! relative flex h-full flex-1 flex-col space-y-3 overflow-scroll rounded-lg shadow-md'>
			<div className='bg-card sticky top-0 z-20 flex items-center gap-x-6 border-b p-4 xl:px-6'>
				<TableIndicators />
				<TableFormDialogTrigger />
			</div>

			<div className='grid h-full auto-rows-max grid-cols-4 gap-4 p-4 sm:max-lg:[zoom:0.8] xl:p-6'>
				{isLoading ? (
					Array.from({ length: 12 }, (_, index) => <Skeleton key={index} className='size-20' />)
				) : Array.isArray(data) && data.length > 0 ? (
					data
						.toSorted((a, b) => a.name.slice(1, -1).localeCompare(b.name.slice(1, -1)))
						.map((table) => <TableCard key={table.slug} data={table} />)
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

export default TableMap
