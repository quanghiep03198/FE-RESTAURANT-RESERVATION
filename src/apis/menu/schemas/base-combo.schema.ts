import { DayInWeek } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { array, coerce, nativeEnum, number, object, string } from 'zod'
import { ComboTag } from '../constants'

export const baseComboSchema = object({
	name: string({ message: 'Vui lòng điền tên Combo' })
		.nonempty({ message: 'Vui lòng điền tên Combo' })
		.min(3, 'Tên Combo tối thiểu phải có 3 ký tự'),
	remark: string().optional(),
	combo_price: number({ message: 'Vui lòng điền giá bán' }).min(1000, {
		message: `Giá bán tối thiểu từ ${formatCurrency(1000)}`
	}),
	max_use_times: number({ message: 'Vui lòng nhập số lượng mở bán' }).min(10, 'Số lượng mở bán tối thiểu là 10'),
	tag: nativeEnum(ComboTag).optional(),
	start_at: coerce.date({ message: 'Vui long chọn thời gian bắt đầu' }),
	end_at: coerce.date({ message: 'Vui long chọn thời thời gian kết thúc' }),
	day_in_week: array(nativeEnum(DayInWeek)).min(1),
	start_time: string().refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(val), {
		message: 'Thời gian phải ở định dạng HH:mm (24 giờ)'
	}),
	end_time: string().refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(val), {
		message: 'Thời gian phải ở định dạng HH:mm (24 giờ)'
	}),
	dishes: array(
		object({
			dish_slug: string().nonempty(),
			quantity: number({ message: 'Vui lòng nhập số lượng món' }).min(1, 'Số lượng tối thiểu là 1')
		})
	)
})
