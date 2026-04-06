import { format, parse } from 'date-fns'
import { DayInWeek } from '../constants/enums'

/**
 * Format a time string from 'HH:mm:ss' to 'HH:mm'
 * @example formatTime('10:00:00') // '10:00'
 */
export function formatTime(time: string | null | undefined): string {
	if (!time) return ''
	return format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm')
}

const WEEKDAY_ORDER = Object.values(DayInWeek)
const WEEKDAY_LABELS: Record<TDayInWeek, string> = {
	T2: 'Thứ Hai',
	T3: 'Thứ Ba',
	T4: 'Thứ Tư',
	T5: 'Thứ Năm',
	T6: 'Thứ Sáu',
	T7: 'Thứ Bảy',
	CN: 'Chủ Nhật'
}

export function formatDayInWeek(day: TDayInWeek): string {
	return WEEKDAY_LABELS[day]
}

/**
 * Format an array of Vietnamese weekday abbreviations (EEEEE, locale vi) into a compact string.
 * Consecutive days are shown as a range, non-consecutive days are separated by commas.
 * @example formatDaysInWeek(['T2', 'T3', 'T4', 'T6', 'T7']) // 'T2 - T4, T6 - T7'
 * @example formatDaysInWeek(['T2', 'T4', 'T6']) // 'T2, T4, T6'
 * @example formatDaysInWeek(['T2', 'T3', 'T4', 'T5', 'T6']) // 'T2 - T6'
 */
export function formatStreakDaysInWeek(days: DayInWeek[], minimal: boolean = false): string {
	if (!days.length) return ''

	const indices = [...new Set(days.map((d) => WEEKDAY_ORDER.indexOf(d)).filter((i) => i !== -1))]
	indices.sort((a, b) => a - b)

	if (indices.length === WEEKDAY_ORDER.length) {
		return 'Cả tuần'
	}

	const groups: number[][] = []
	for (const idx of indices) {
		const lastGroup = groups.at(-1)
		if (lastGroup && idx === lastGroup.at(-1)! + 1) {
			lastGroup.push(idx)
		} else {
			groups.push([idx])
		}
	}

	return groups
		.map((group) => {
			const startDay = minimal ? WEEKDAY_ORDER[group[0]] : formatDayInWeek(WEEKDAY_ORDER[group[0]])
			const endDay = minimal ? WEEKDAY_ORDER[group.at(-1)!] : formatDayInWeek(WEEKDAY_ORDER[group.at(-1)!])
			const day = minimal ? WEEKDAY_ORDER[group[0]] : formatDayInWeek(WEEKDAY_ORDER[group[0]])
			return group.length > 1 ? `${startDay} - ${endDay}` : day
		})
		.join(', ')
}
