import { TableStatus } from '@/apis/table/constants'
import type { ITable } from '@/apis/table/types'
import React from 'react'
import tw from 'tailwind-styled-components'
import { Icon, type IconProps } from '../ui/icon'
import TableCardDropdownMenu from './table-card-dropdown-menu'

const statusIcon: Record<TableStatus, IconProps['name']> = {
	[TableStatus.AVAILABLE]: 'CircleDashed',
	[TableStatus.OCCUPIED]: 'Users',
	[TableStatus.RESERVED]: 'CalendarCheck',
	[TableStatus.DISABLED]: 'CircleSlash2'
}

const TableCard: React.FC<{ data: ITable }> = ({ data }) => {
	return (
		<TableCardWrapper key={data.slug} status={data.status}>
			<TableCardDropdownMenu data={data} />
			<TableCardTitle>{data.name}</TableCardTitle>
			<Icon name={statusIcon[data.status]} size={20} />
			<TableCardDescription>{data.capacity} khách</TableCardDescription>
		</TableCardWrapper>
	)
}

const TableCardWrapper: React.FC<React.ComponentProps<'div'> & { status: TableStatus }> =
	tw.div`relative flex flex-col items-center justify-center rounded-lg p-4 gap-3 group cursor-pointer
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
	}}`
const TableCardTitle = tw.span`font-medium uppercase`
const TableCardDescription = tw.small`text-muted-foreground`

export default TableCard
