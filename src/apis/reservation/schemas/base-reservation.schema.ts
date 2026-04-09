import { PHONE_REGEX } from '@/apis/user/constants'
import { date, number, object, string } from 'zod'

export const baseReservationSchema = object({
	customer_name: string({ message: 'Vui lòng điền tên người đặt bàn' }).nonempty({
		message: 'Vui lòng điền tên người đặt bàn'
	}),
	customer_phone: string({ message: 'Vui lòng điền SĐT đặt bàn' }).refine((value) => PHONE_REGEX.test(value), {
		message: 'Số điện thoại đặt bàn không hợp lệ'
	}),
	guest_count: number({ message: 'Vui lòng nhập số lượng người dự kiến' }),
	remark: string().nullish(),
	reservation_time: date({ message: 'Vui lòng chọn thời gian dự kiến lấy bàn' }),
	deposit_amount: number().nullish()
})
