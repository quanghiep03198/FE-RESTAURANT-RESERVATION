import { TableStatus } from '@/apis/table/constants'
import { useGetTableQuery } from '@/apis/table/hooks/use-table-request'
import tw from 'tailwind-styled-components'
import { Button } from '../ui/button'
import { Empty } from '../ui/empty'
import { Icon, type IconProps } from '../ui/icon'
import { Skeleton } from '../ui/skeleton'

const statusIcon: Record<TableStatus, IconProps['name']> = {
	[TableStatus.AVAILABLE]: 'CircleDashed',
	[TableStatus.OCCUPIED]: 'Users',
	[TableStatus.RESERVED]: 'CalendarCheck',
	[TableStatus.DISABLED]: 'CircleSlash2'
}

const TableMap: React.FC = () => {
	const { data, isLoading } = useGetTableQuery()

	return (
		<section className='bg-card h-full flex-1 space-y-3 rounded-lg p-4 shadow-md xl:p-6'>
			<div className='bg-background flex items-center gap-x-6 rounded-lg p-4'>
				<TableStatusItem>
					<TableStatusIndicator status={TableStatus.AVAILABLE} />
					<TableStatusLabel>Còn trống</TableStatusLabel>
				</TableStatusItem>
				<TableStatusItem>
					<TableStatusIndicator status={TableStatus.OCCUPIED} />
					<TableStatusLabel>Đang dùng</TableStatusLabel>
				</TableStatusItem>
				<TableStatusItem>
					<TableStatusIndicator status={TableStatus.RESERVED} />
					<TableStatusLabel>Đã đặt</TableStatusLabel>
				</TableStatusItem>
				<Button className='ml-auto'>
					<Icon name='Plus' /> Thêm bàn
				</Button>
			</div>

			<div className='grid h-full grid-cols-4 gap-4'>
				{isLoading ? (
					Array.from({ length: 12 }, (_, index) => <Skeleton key={index} className='size-20' />)
				) : Array.isArray(data) && data.length > 0 ? (
					data.map((table) => (
						<TableItem key={table.slug} status={table.status}>
							<TableItemTitle>{table.name}</TableItemTitle>
							<Icon name={statusIcon[table.status]} size={20} />
							<TableItemDescription>{table.capacity} khách</TableItemDescription>
						</TableItem>
					))
				) : (
					<Empty></Empty>
				)}
			</div>
		</section>
	)
}

const TableStatusItem: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-center gap-x-2`
const TableStatusIndicator: React.FC<React.ComponentProps<'div'> & { status: TableStatus }> = tw.div`
	size-4 aspect-square rounded
	${(props: { status: TableStatus }) => {
		switch (props.status) {
			case TableStatus.AVAILABLE:
				return 'border-2 text-foreground bg-muted text-muted-foreground border-dashed'
			case TableStatus.OCCUPIED:
				return 'bg-primary text-primary-foreground'
			case TableStatus.RESERVED:
				return 'bg-secondary text-secondary-foreground'
			case TableStatus.DISABLED:
				return 'bg-muted text-muted-foregound cursor-not-allowed'
		}
	}}
`
const TableStatusLabel: React.FC<React.ComponentProps<'small'>> = tw.small`font-medium`
const TableItem: React.FC<React.ComponentProps<'div'> & { status: TableStatus }> = tw.div`
	h-40 flex flex-col items-center justify-center rounded-lg p-4 gap-3
	${(props: { status: TableStatus }) => {
		switch (props.status) {
			case TableStatus.AVAILABLE:
				return 'border-2 text-foreground bg-background border-dashed'
			case TableStatus.OCCUPIED:
				return 'bg-primary text-primary-foreground'
			case TableStatus.RESERVED:
				return 'bg-secondary text-secondary-foreground'
			case TableStatus.DISABLED:
				return 'bg-muted text-muted-foregound cursor-not-allowed border'
		}
	}}
`
const TableItemTitle = tw.span`font-medium uppercase`
const TableItemDescription = tw.small`text-muted-foreground`

export default TableMap
