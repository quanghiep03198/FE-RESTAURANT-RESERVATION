import { isAfter, parse } from 'date-fns'
import { type infer as Infer } from 'zod'
import { baseComboSchema } from './base-combo.schema'

export const createComboSchema = baseComboSchema.superRefine((values, ctx) => {
	const fromTime = parse(values.start_time, 'HH:mm', new Date())
	const toTime = parse(values.end_time, 'HH:mm', new Date())

	if (!(values.combo_image?.file instanceof File)) {
		ctx.addIssue({
			code: 'custom',
			path: ['combo_image'],
			message: 'Vui lòng chọn 1 ảnh'
		})
	}

	if (!isAfter(toTime, fromTime)) {
		ctx.addIssue({
			code: 'custom',
			path: ['end_time'],
			message: 'Thời gian kết thúc bán trong ngày phải sau thời gian bắt đầu'
		})
	}

	const totalPrice = values.dishes.reduce((acc, curr) => acc + curr.dish.price * curr.quantity, 0)
	if (values.discount_price > totalPrice)
		ctx.addIssue({
			code: 'too_big',
			path: ['discount_price'],
			fatal: true,
			type: 'number',
			maximum: totalPrice,
			inclusive: true,
			message: 'Giá bán không được vượt quá tổng giá các món trong Combo'
		})
})

export type TCreateComboSchema = typeof createComboSchema

export type TCreateComboValues = Infer<typeof createComboSchema>
