import { TableStatus } from '@/apis/table/constants'
import React, { memo } from 'react'
import tw from 'tailwind-styled-components'

const TableIndicators: React.FC = () => {
	return (
		<>
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
		</>
	)
}

const TableStatusItem: React.FC<React.ComponentProps<'div'>> = tw.div`flex items-center gap-x-2`
const TableStatusIndicator: React.FC<React.ComponentProps<'div'> & { status: TableStatus }> = tw.div`
	size-5 aspect-square rounded
	${(props: { status: TableStatus }) => {
		switch (props.status) {
			case TableStatus.AVAILABLE:
				return 'border-[1.5px] bg-muted text-muted-foreground border-dashed'
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

export default memo(TableIndicators)
