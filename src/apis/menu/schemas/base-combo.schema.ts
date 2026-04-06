import { DayInWeek } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { any, array, coerce, nativeEnum, number, object, string, type infer as Infer } from 'zod'
import { ComboTag } from '../constants'

export const baseComboSchema = object({
	name: string({ message: 'Vui lòng điền tên Combo' })
		.nonempty({ message: 'Vui lòng điền tên Combo' })
		.min(3, 'Tên Combo tối thiểu phải có 3 ký tự'),
	remark: string().nullish(),
	combo_price: number({ message: 'Vui lòng điền giá bán' }).min(1000, {
		message: `Giá bán tối thiểu từ ${formatCurrency(1000)}`
	}),
	max_use_times: number({ message: 'Vui lòng nhập số lượng mở bán' }).min(10, 'Số lượng mở bán tối thiểu là 10'),
	tag: nativeEnum(ComboTag, { message: 'Vui lòng nhập 1 tag cho Combo' }),
	period: object({
		from: coerce.date({ message: 'Vui lòng chọn thời gian bắt đầu' }),
		to: coerce.date({ message: 'Vui lòng chọn thời gian kết thúc' })
	}).nullish(),
	days_in_week: array(nativeEnum(DayInWeek)).min(1),
	start_time: string().refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(val), {
		message: 'Thời gian phải ở định dạng HH:mm (24 giờ)'
	}),
	end_time: string().refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(val), {
		message: 'Thời gian phải ở định dạng HH:mm (24 giờ)'
	}),
	combo_image: object({ file: any() }, { message: 'Vui lòng cung cấp 1 ảnh' }),
	dishes: array(
		object({
			dish: object(
				{ slug: string({ message: 'Vui lòng chọn 1 món ăn có trong Combo' }), price: number() },
				{ message: 'Vui lòng chọn 1 món ăn có trong Combo' }
			),
			quantity: number({ message: 'Vui lòng nhập số lượng món' }).min(1, 'Số lượng tối thiểu là 1')
		})
	)
})

type TBaseComboValues = Infer<typeof baseComboSchema>

export type TComboFormValues = Omit<TBaseComboValues, 'period'> & {
	combo_image: File
	start_at: Date
	end_at: Date
	dishes: Array<{ dish_slug: string; quantity: number }>
}
