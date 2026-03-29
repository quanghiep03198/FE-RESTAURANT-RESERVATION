import { cn } from '@/common/utils/cn'
import { Calendar01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { addMonths, format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type DateRangePickerProps = {
	calendarProps?: React.ComponentProps<typeof Calendar.prototype>
	triggerProps?: React.ComponentProps<typeof Button.prototype>
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	triggerProps,
	calendarProps = { numberOfMonths: 1, selected: { from: new Date(), to: addMonths(new Date(), 1) } }
}) => {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						{...triggerProps}
						variant={'outline'}
						className={cn(
							'w-full max-w-xs justify-start text-left font-normal',
							!calendarProps?.selected && 'text-muted-foreground',
							triggerProps?.className
						)}>
						<HugeiconsIcon icon={Calendar01Icon} className='mr-2 h-4 w-4' />
						{calendarProps?.selected?.from ? (
							calendarProps?.selected.to ? (
								<>
									{format(calendarProps.selected.from, 'LLL dd, y', { locale: vi })} {' - '}
									{format(calendarProps.selected.to, 'LLL dd, y', { locale: vi })}
								</>
							) : (
								format(calendarProps.selected.from, 'LLL dd, y', { locale: vi })
							)
						) : (
							'Chọn ngày'
						)}
					</Button>
				}
			/>
			<PopoverContent className='scrollbar-none w-auto overflow-auto p-0 sm:max-h-1/2' align='center'>
				<Calendar
					{...calendarProps}
					initialFocus
					mode='range'
					selected={
						calendarProps?.selected ?? {
							from: new Date(),
							to: new Date()
						}
					}
					onSelect={(value) => {
						if (typeof calendarProps?.onSelect === 'function') calendarProps.onSelect(value)
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}
