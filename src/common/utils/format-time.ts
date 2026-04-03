import { format, parse } from 'date-fns'

/**
 * Format a time string from 'HH:mm:ss' to 'HH:mm'
 * @example formatTime('10:00:00') // '10:00'
 */
export function formatTime(time: string | null | undefined): string {
	if (!time) return ''
	return format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm')
}
