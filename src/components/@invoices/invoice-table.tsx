import { useGetInvoiceQuery } from '@/apis/invoice/hooks/use-invoice-request'
import type { IInvoice } from '@/apis/invoice/types'
import generateAvatar from '@/common/libs/generate-avatar'
import { formatCurrency } from '@/common/utils/format-currency'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import React, { useMemo } from 'react'
import { DataGrid } from '../shared/data-grid'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item'
import InvoiceTableToolbar from './invoice-table-toolbar'
import PaymentStatusBadge from './payment-status-badge'

const InvoiceTable: React.FC = () => {
	const { data, isLoading } = useGetInvoiceQuery()
	console.log(data)
	const columnHelper = createColumnHelper<IInvoice>()

	const columns = useMemo(
		() => [
			columnHelper.accessor('customer_name', {
				header: 'Khách hàng',
				cell: ({ row }) => (
					<Item className='gap-x-1 p-0'>
						<ItemMedia variant='image'>
							<Avatar>
								<AvatarImage
									src={generateAvatar({ name: row.original.customer_name })}
									alt={row.original.customer_name}
								/>
								<AvatarFallback>{row.original.customer_name}</AvatarFallback>
							</Avatar>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>{row.original.customer_name}</ItemTitle>
							<ItemDescription>{row.original.customer_phone}</ItemDescription>
						</ItemContent>
					</Item>
				)
			}),
			columnHelper.accessor('no', {
				header: 'Mã hóa đơn',
				cell: ({ getValue }) => '#' + getValue()
			}),
			columnHelper.accessor('paid_at', {
				header: 'Ngày thanh toán',
				cell: ({ getValue }) => format(getValue(), 'dd/MM/yyyy', { locale: vi })
			}),
			columnHelper.accessor('issued_at', {
				header: 'Ngày xuất hóa đơn',
				cell: ({ getValue }) => format(getValue(), 'dd/MM/yyyy', { locale: vi })
			}),
			columnHelper.accessor('total_amount', {
				header: 'Tổng tiền',
				cell: ({ getValue }) => formatCurrency(getValue())
			}),
			columnHelper.accessor('deposit_amount', {
				header: 'Trả trước',
				cell: ({ getValue }) => formatCurrency(getValue())
			}),
			columnHelper.accessor('paid_amount', {
				header: 'Đã thanh toán (+VAT)',
				cell: ({ getValue, row }) => formatCurrency(getValue() + row.original.deposit_amount)
			}),

			columnHelper.accessor('payment_status', {
				header: 'Đã thanh toán',
				cell: PaymentStatusBadge
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
				className: 'h-[calc(var(--outlet-wrapper-height)-9rem)]'
			}}
			toolbarProps={{
				override: true,
				render: InvoiceTableToolbar
			}}
		/>
	)
}

export default InvoiceTable
