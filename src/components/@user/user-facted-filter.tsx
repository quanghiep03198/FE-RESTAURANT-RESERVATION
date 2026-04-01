import type { IUser, TUserRoleCode } from '@/apis/user/types'
import { cn } from '@/common/libs/utils'
import { type Column } from '@tanstack/react-table'
import { CheckIcon } from 'lucide-react'
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
import { Icon, type IconProps } from '../ui/icon'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'

export interface IDataTableFacetedFilterProps {
	column?: Column<IUser, TUserRoleCode>
	title?: string
	options: {
		label: string
		value: TUserRoleCode
		icon?: IconProps['name']
	}[]
}

export function DataTableFacetedFilter({ column, title, options }: IDataTableFacetedFilterProps) {
	const facets = column?.getFacetedUniqueValues()
	const selectedValues = new Set(column?.getFilterValue?.() as string[])

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button variant='outline' className='bg-background border-dashed'>
						<Icon name='CircleFadingPlus' />
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
										className='*:last:hidden'
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
											<CheckIcon className='text-muted-foreground stroke-primary-foreground size-3 stroke-3' />
										</div>
										{option.icon && <Icon name={option.icon} className='text-muted-foreground size-4' />}
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
										<Icon name='X' />
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
