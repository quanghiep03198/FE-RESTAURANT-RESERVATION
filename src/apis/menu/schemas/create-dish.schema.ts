import { isAfter, parse } from 'date-fns'
import { type infer as Infer } from 'zod'
import { baseDishSchema } from './base-dish.schema'

export const createDishSchema = baseDishSchema.superRefine((values, ctx) => {
	const fromTime = parse(values.available_from, 'HH:mm', new Date())
	const toTime = parse(values.available_to, 'HH:mm', new Date())

	if (!isAfter(toTime, fromTime)) {
		ctx.addIssue({
			code: 'custom',
			path: ['available_to'],
			message: 'Thời gian kết thúc phải sau thời gian bắt đầu'
		})
	}
})

export type TCreateDishSchema = typeof createDishSchema

export type TCreateDishValues = Infer<typeof createDishSchema>
