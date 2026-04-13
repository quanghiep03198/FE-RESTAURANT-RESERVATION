import { PaymentStatus } from '@/apis/invoice/constants'
import { useGetInvoiceQuery } from '@/apis/invoice/hooks/use-invoice-request'
import type { IInvoice } from '@/apis/invoice/types'
import type { Column, Table } from '@tanstack/react-table'
import type { EventEmitter } from 'ahooks/lib/useEventEmitter'
import GlobalFilterInput from '../shared/data-grid/components/global-filter-input'
import {
	DataTableFacetedFilter,
	type IDataTableFacetedFilterProps
} from '../shared/data-grid/components/table-faceted-filter'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'

export const paymentStatusMetadata: IDataTableFacetedFilterProps<IInvoice, PaymentStatus>['options'] = [
	{
		label: 'Đã thanh toán',
		icon: 'CircleCheckBig',
		value: PaymentStatus.PAID,
		color: 'var(--success)'
	},
	{
		label: 'Chưa thanh toán',
		icon: 'Loader',
		value: PaymentStatus.UNPAID,
		color: 'var(--muted-foreground)'
	},
	{
		label: 'Thanh toán 1 phần',
		icon: 'CircleDotDashed',
		value: PaymentStatus.PARTIAL,
		color: 'var(--warning)'
	}
]

const InvoiceTableToolbar: React.FC<{ table: Table<IInvoice>; event$: EventEmitter<any> }> = ({ table }) => {
	const { refetch } = useGetInvoiceQuery()

	return (
		<div className='flex items-center gap-x-2'>
			<GlobalFilterInput table={table} />
			<DataTableFacetedFilter
				column={table.getColumn('payment_status') as Column<IInvoice, PaymentStatus>}
				title='Trạng thái'
				options={paymentStatusMetadata}
			/>

			<Button variant='outline' className='ml-auto' onClick={() => refetch()}>
				<Icon name='RefreshCcw' /> Tải lại
			</Button>
		</div>
	)
}

export default InvoiceTableToolbar
