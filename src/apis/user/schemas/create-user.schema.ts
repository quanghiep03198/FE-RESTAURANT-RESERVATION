import { object, string, type infer as Infer } from 'zod'
import { PHONE_REGEX } from '../constants'

export const createUserSchema = object({
	user_name: string({ message: 'Tên đăng nhập không được để trống' }).min(
		3,
		'Tên đăng nhập phải có tối thiểu 3 ký tự'
	),
	password: string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
	full_name: string({ message: 'Họ tên không được để trống' }).min(1, 'Họ và tên không được để trống'),
	phone: string({ message: 'Số điện thoại không được để trống' }).refine((value) => PHONE_REGEX.test(value), {
		message: 'Số điện thoại không hợp lệ'
	}),
	email: string({ message: 'Email không được để trống' }).email({ message: 'Email không hợp lệ' }),
	role_id: string({ message: 'Vai trò không được để trống' }).transform((value) => +value)
})

export type TCreateUserSchema = typeof createUserSchema

export type TCreateUserValues = Infer<typeof createUserSchema>
