import { PHONE_REGEX } from '@/apis/user/constants'
import { date, number, object, string } from 'zod'

export const baseReservationSchema = object({
	customer_name: string({ message: 'Vui lòng điền tên người đặt bàn' })
		.nonempty({
			message: 'Vui lòng điền tên người đặt bàn'
		})
		.default(''),
	customer_phone: string({ message: 'Vui lòng điền SĐT đặt bàn' })
		.refine((value) => PHONE_REGEX.test(value), {
			message: 'Số điện thoại đặt bàn không hợp lệ'
		})
		.default(''),
	guest_count: number({ message: 'Vui lòng nhập số lượng người dự kiến' })
		.min(1, {
			message: 'Số lượng người dự kiến tối thiểu là 1'
		})
		.default(1),
	remark: string().nullish(),
	reservation_time: date({ message: 'Vui lòng chọn thời gian dự kiến lấy bàn' }),
	deposit_amount: number().nullish()
})
