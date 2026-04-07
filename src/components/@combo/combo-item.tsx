import { useDeleteComboMutation } from '@/apis/menu/hooks/use-combo-request'
import type { ICombo } from '@/apis/menu/types'
import { CommonActions } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { formatStreakDaysInWeek } from '@/common/utils/format-date-time'
import { usePageContext } from '@/contexts/event-context'
import React, { useState } from 'react'
import Image from '../shared/image'
import { Badge } from '../ui/badge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemSeparator, ItemTitle } from '../ui/item'
import { Separator } from '../ui/separator'
import { Spinner } from '../ui/spinner'
import { Typography } from '../ui/typography'

const ComboItem: React.FC<{ data: ICombo }> = ({ data }) => {
	return (
		<Item variant='outline' role='listitem' className='bg-card text-card-foreground relative'>
			<ItemMedia variant='image' className='relative size-32 h-auto w-auto text-xs xl:size-40'>
				<Image src={data.combo_image?.url} className='h-full w-full rounded-md' />
				<Badge className='absolute bottom-2 left-2 text-xs! shadow-lg'>{data.tag}</Badge>
			</ItemMedia>
			<ItemDropdownMenu data={data} />
			<ItemContent className='relative'>
				<ItemTitle className='text-lg'>{data.name}</ItemTitle>
				<ItemDescription>{data.remark}</ItemDescription>
				<ItemSeparator />
				<div className='auto-row-auto grid auto-cols-auto grid-flow-col gap-x-4 gap-y-2'>
					<Typography variant='small' className='col-start-1 row-start-1'>
						Thời gian áp dụng
					</Typography>
					<div className='xxl:text-base col-start-1 row-start-2 inline-flex items-center gap-x-4 text-sm'>
						<Typography className='font-medium'>{formatStreakDaysInWeek(data.days_in_week, true)}</Typography>
						<Separator orientation='vertical' />
						<Typography className='font-medium'>
							{data.start_time} - {data.end_time}
						</Typography>
					</div>
					{data.selling_price - data.discount_price !== data.selling_price && (
						<Typography variant='small' color='muted' className='col-start-2 row-start-1 text-right line-through'>
							{formatCurrency(data.selling_price)}
						</Typography>
					)}
					<Typography variant='h4' className='col-start-2 row-start-2 text-right'>
						{formatCurrency(data.selling_price - data.discount_price)}
					</Typography>
				</div>
			</ItemContent>
		</Item>
	)
}

const ItemDropdownMenu: React.FC<{ data: ICombo & { start_time: string; end_time: string } }> = ({ data }) => {
	const { event$ } = usePageContext()
	const { mutateAsync: deleteAsync, isPending: isDeleting } = useDeleteComboMutation()

	const [open, setOpen] = useState<boolean>(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger className='absolute top-4 right-4 z-20'>
				<Icon name='EllipsisVertical' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40'>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => event$.emit({ action: CommonActions.UPDATE, payload: data })}>
						Chỉnh sửa
					</DropdownMenuItem>
					<DropdownMenuItem onClick={async () => await deleteAsync(data.slug)}>
						{isDeleting && <Spinner />} Xóa
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ComboItem
