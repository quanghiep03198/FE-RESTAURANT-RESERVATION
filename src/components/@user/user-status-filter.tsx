'use no memo'

import type { IUser } from '@/apis/user/types'
import { RecordStatus } from '@/common/constants/enums'

import { cn } from '@/common/utils/cn'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

import { CircleCheck, CircleMinus, CirclePlus, X } from '@hugeicons/core-free-icons'
import type { Table } from '@tanstack/react-table'
import { isNil } from 'lodash-es'
import React, { useMemo } from 'react'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'

type DropdownOption = { label: string; value: RecordStatus; icon: IconSvgElement; count: number }

const UserStatusFilter: React.FC<{ table: Table<IUser> }> = ({ table }) => {
	const { data } = table.options

	const currentFilterValue = table.getColumn('is_active').getFilterValue()

	const dropdownOptions: DropdownOption[] = useMemo(
		() =>
			[
				{
					label: 'Đang hoạt động',
					value: RecordStatus.ACTIVE,
					icon: CircleCheck
				},
				{
					label: 'Tạm khóa',
					value: RecordStatus.INACTIVE,
					icon: CircleMinus
				}
			].map((item: DropdownOption) => ({
				...item,
				count: data.filter((user) =>
					user.is_active ? item.value === RecordStatus.ACTIVE : item.value === RecordStatus.INACTIVE
				).length
			})),
		[data]
	)

	const handleValueChange = (value: RecordStatus) => {
		table.getColumn('is_active').setFilterValue(value === RecordStatus.ACTIVE)
		// setParams({ ...searchParams, status: value as TruckloadDeliveryStatus })
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline', className: 'border-dashed' }))}>
				<HugeiconsIcon icon={CirclePlus} /> Trạng thái
				{typeof currentFilterValue === 'boolean' && (
					<div className='inline-flex items-center md:hidden'>
						<Separator orientation='vertical' className='mx-2 h-4' />{' '}
						<Badge variant='secondary' className='mx-1 rounded-sm px-1.5 font-normal'>
							{currentFilterValue ? 'Đang hoạt động' : 'Tạm khóa'}
						</Badge>
					</div>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-64' align='end'>
				<DropdownMenuRadioGroup
					value={
						isNil(currentFilterValue) ? null : currentFilterValue ? RecordStatus.ACTIVE : RecordStatus.INACTIVE
					}
					onValueChange={handleValueChange}>
					{dropdownOptions.map((option) => (
						<DropdownMenuRadioItem key={option.value} value={option.value} className='gap-x-2'>
							<HugeiconsIcon
								icon={option.icon}
								className={cn({
									'stroke-success': option.value === RecordStatus.ACTIVE,
									'stroke-muted-foreground': option.value === RecordStatus.INACTIVE
								})}
							/>

							{option.label}
							<Badge variant='outline' className='ml-auto font-normal'>
								{option.count}
							</Badge>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					disabled={!table.getColumn('is_active')?.getFilterValue()}
					className='justify-center gap-x-2'
					onClick={() => table.getColumn('is_active').setFilterValue(null)}>
					<HugeiconsIcon icon={X} />
					Bỏ lọc
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserStatusFilter
