import { isAfter, parse } from 'date-fns'
import { baseComboSchema } from './base-combo.schema'

export const createComboSchema = baseComboSchema.superRefine((values, ctx) => {
	const fromTime = parse(values.start_time, 'HH:mm', new Date())
	const toTime = parse(values.end_time, 'HH:mm', new Date())

	if (!isAfter(toTime, fromTime)) {
		ctx.addIssue({
			code: 'custom',
			path: ['end_time'],
			message: 'Thời gian kết thúc bán trong ngày phải sau thời gian bắt đầu'
		})
	}

	if (!isAfter(values.end_at, values.start_at))
		ctx.addIssue({
			code: 'custom',
			path: ['end_at'],
			message: 'Thời gian kết thúc mở bán phải lớn hơn thời gian bắt đầu'
		})
})
