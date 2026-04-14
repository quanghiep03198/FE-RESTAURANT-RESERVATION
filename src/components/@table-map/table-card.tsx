import { getCartByTableQueryOptions } from '@/apis/cart/hooks/use-cart-request'
import { TableStatus } from '@/apis/table/constants'
import type { ITableCardData } from '@/apis/table/types'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { Icon, type IconProps } from '../ui/icon'
import TableCardDropdownMenu from './table-card-dropdown-menu'

const statusIcon: Record<TableStatus, IconProps['name']> = {
	[TableStatus.AVAILABLE]: 'CircleDashed',
	[TableStatus.OCCUPIED]: 'HandPlatter',
	[TableStatus.RESERVED]: 'CalendarCheck',
	[TableStatus.DISABLED]: 'CircleSlash2'
}

const TableCard: React.FC<{
	data: ITableCardData
}> = ({ data }) => {
	const queryClient = useQueryClient()
	const { event$ } = usePageContext()

	return (
		<TableCardWrapper
			key={data.slug}
			status={data.status}
			onClick={() => {
				if (!data.cart_id) {
					toast.info(
						'Bàn này hiện chưa có phiên phục vụ nào, vui lòng mở phiên phục vụ trước khi thực hiện các thao tác khác'
					)
					return
				}
				event$.emit({ action: CommonActions.READ, payload: data })
			}}
			onPointerEnter={() => {
				if (data.cart_id) queryClient.prefetchQuery(getCartByTableQueryOptions(data.id))
			}}>
			<TableCardDropdownMenu data={data} />
			<TableCardTitle>{data.name}</TableCardTitle>
			<Icon name={statusIcon[data.status]} size={20} />
			<TableCardDescription>
				<Icon name='Users' size={14} />({data.capacity} khách)
			</TableCardDescription>
		</TableCardWrapper>
	)
}

const TableCardWrapper: React.FC<React.ComponentProps<'div'> & { status: TableStatus }> = tw.div`
	relative flex flex-col items-center justify-center rounded-lg p-4 gap-3 group cursor-pointer
	${(props: { status: TableStatus }) => {
		switch (props.status) {
			case TableStatus.AVAILABLE:
				return 'border-2 text-foreground bg-background border-dashed'
			case TableStatus.OCCUPIED:
				return 'bg-primary text-primary-foreground'
			case TableStatus.RESERVED:
				return 'bg-secondary text-secondary-foreground'
			case TableStatus.DISABLED:
				return 'bg-muted text-muted-foregound border'
		}
	}}
`
const TableCardTitle = tw.span`font-medium uppercase border-2 p-2 sm:p-1 sm:text-sm rounded-md aspect-square text-center place-content-center`
const TableCardDescription = tw.small`text-inherit inline-flex items-center gap-x-1`

export default TableCard
