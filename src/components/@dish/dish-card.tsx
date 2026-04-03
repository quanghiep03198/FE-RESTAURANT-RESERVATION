import { useDeleteDishMutation } from '@/apis/menu/hooks/use-dish-request'
import type { IDish } from '@/apis/menu/types'
import { CommonActions } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { getStorageUrl } from '@/common/utils/get-storage-url'
import { usePageContext } from '@/contexts/event-context'
import React, { useState } from 'react'
import Image from '../shared/image'
import { Badge } from '../ui/badge'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import { Spinner } from '../ui/spinner'

const DishCard: React.FC<{ data: IDish & { category_name: string } }> = ({ data }) => {
	const isDiscounted = +data.discounted_price < +data.price

	return (
		<Card
			className='relative mx-auto h-full w-full max-w-sm pt-0 [&:has(button[data-slot=dropdown-menu-trigger][aria-expanded=true])_*[role=img]]:brightness-50 [&:has(button[data-slot=dropdown-menu-trigger][aria-expanded=true])_img]:brightness-50'
			title={data.name}>
			<CardDropdownMenu data={data} />
			<Image
				src={getStorageUrl(data.image?.url)}
				alt={data.name}
				className='relative aspect-video h-40 w-full object-cover duration-200 ease-in-out group-hover/card:brightness-50'
			/>
			{data.is_new && (
				<Badge className='absolute top-2 left-2 z-10 [&>svg]:size-3!'>
					<Icon name='Sparkles' /> Món mới
				</Badge>
			)}
			<CardHeader>
				{data.is_featured && (
					<CardAction>
						<Badge variant='secondary' className='[&>svg]:size-3!'>
							<Icon name='Star' className='fill-amber-400 stroke-amber-400' /> Nổi bật
						</Badge>
					</CardAction>
				)}
				<CardDescription className='line-clamp-1' title={data.name}>
					{data.name}
				</CardDescription>
				<div className='min-h-13'>
					{isDiscounted ? (
						<>
							<CardTitle>
								{formatCurrency(data.discounted_price)} {data.unit && `(${data.unit})`}
							</CardTitle>
							<CardDescription className='line-through'>{formatCurrency(data.price)}</CardDescription>
						</>
					) : (
						<CardTitle>
							{formatCurrency(data.price)} {data.unit && `(${data.unit})`}
						</CardTitle>
					)}
				</div>
			</CardHeader>
			<CardFooter>
				<CardDescription className='line-clamp-3'>{data.description}</CardDescription>
			</CardFooter>
		</Card>
	)
}

const CardDropdownMenu: React.FC<{ data: IDish & { category_name: string } }> = ({ data }) => {
	const { event$ } = usePageContext()
	const { mutateAsync: deleteAsync, isPending: isDeleting } = useDeleteDishMutation()

	const [open, setOpen] = useState<boolean>(false)

	return (
		<DropdownMenu open={open || isDeleting} onOpenChange={setOpen}>
			<DropdownMenuTrigger className='text-primary-foreground absolute top-2 right-2 z-10 inline-flex size-6 cursor-pointer items-center justify-center opacity-0 duration-200 group-hover/card:opacity-100 aria-expanded:opacity-100'>
				<Icon name='EllipsisVertical' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40'>
				<DropdownMenuGroup>
					<DropdownMenuItem>Đưa vào kinh doanh</DropdownMenuItem>
					<DropdownMenuSeparator />
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

export default DishCard
