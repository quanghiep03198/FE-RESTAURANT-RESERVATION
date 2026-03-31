import type { IUser, TUserRoleCode } from '@/apis/user/types'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

import { cn } from '@/common/utils/cn'
import { Check, CirclePlus, X } from '@hugeicons/core-free-icons'
import { type Column } from '@tanstack/react-table'
import { Fragment } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'

type UserPropertyValue = IUser[keyof IUser]

export interface IDataTableFacetedFilterProps {
	column?: Column<IUser, TUserRoleCode>
	title?: string
	options: {
		label: string
		value: TUserRoleCode
		icon?: IconSvgElement
	}[]
}

export function DataTableFacetedFilter({ column, title, options }: IDataTableFacetedFilterProps) {
	const facets = column?.getFacetedUniqueValues()
	const selectedValues = new Set(column?.getFilterValue?.() as string[])

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button variant='outline' className='border-dashed'>
						<HugeiconsIcon icon={CirclePlus} />
						{title}
						{selectedValues?.size > 0 && (
							<div className='inline-flex items-center gap-x-2'>
								<Separator orientation='vertical' className='mx-2 h-4' />
								<div className='flex gap-1'>
									{selectedValues.size > 2 ? (
										<Badge variant='secondary' className='rounded-sm px-1.5 font-normal'>
											{`${selectedValues.size} đã chọn`}
										</Badge>
									) : (
										options
											.filter((option) => selectedValues.has(option.value))
											.map((option) => (
												<Badge
													variant='secondary'
													key={option.value}
													className='rounded-sm px-1.5 font-normal'>
													{option.label}
												</Badge>
											))
									)}
								</div>
							</div>
						)}
					</Button>
				}
			/>

			<PopoverContent className='w-72 p-0' align='start'>
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>Không có kết quả nào phù hợp.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value)
								return (
									<CommandItem
										key={option.value}
										className='[&>:last-child]:hidden'
										onSelect={() => {
											if (isSelected) selectedValues.delete(option.value)
											else selectedValues.add(option.value)
											const filterValues = Array.from(selectedValues)
											column?.setFilterValue(filterValues.length ? filterValues : undefined)
										}}>
										<div
											aria-current={isSelected}
											className={cn(
												'flex size-4 items-center justify-center rounded border',
												'aria-current:border-primary aria-current:bg-primary aria-current:text-primary-foreground aria-current:[&_svg]:visible',
												'border-input [&_svg]:invisible'
											)}>
											<HugeiconsIcon icon={Check} className='text-muted-foreground size-3 stroke-3' />
										</div>
										{option.icon && (
											<HugeiconsIcon icon={option.icon} className='text-muted-foreground size-4' />
										)}
										<span>{option.label}</span>
										{facets?.get(option.value) && (
											<span className='text-muted-foreground ml-auto size-4 font-mono text-xs'>
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								)
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<Fragment>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className='flex items-center justify-center text-center *:last:hidden'>
										<HugeiconsIcon icon={X} />
										Bỏ lọc
									</CommandItem>
								</CommandGroup>
							</Fragment>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
