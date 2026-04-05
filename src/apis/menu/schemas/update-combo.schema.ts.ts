import { isAfter, parse } from 'date-fns'
import { type infer as Infer } from 'zod'
import { baseComboSchema } from './base-combo.schema'

export const updateComboSchema = baseComboSchema
	.partial()
	.superRefine((values, ctx) => {
		const fromTime = parse(values.start_time, 'HH:mm', new Date())
		const toTime = parse(values.end_time, 'HH:mm', new Date())

		if (!isAfter(toTime, fromTime)) {
			ctx.addIssue({
				code: 'custom',
				path: ['end_time'],
				message: 'Thời gian kết thúc bán trong ngày phải sau thời gian bắt đầu'
			})
		}

		// if (!isAfter(values.end_at, values.start_at))
		// 	ctx.addIssue({
		// 		code: 'custom',
		// 		path: ['end_at'],
		// 		message: 'Thời gian kết thúc mở bán phải lớn hơn thời gian bắt đầu'
		// 	})
	})
	.transform((values) => ({
		...values,
		start_at: values.promotion_validity_dates.from,
		end_at: values.promotion_validity_dates.to
	}))

export type TUpdateComboSchema = typeof updateComboSchema

export type TUpdateComboValues = Infer<typeof updateComboSchema>
