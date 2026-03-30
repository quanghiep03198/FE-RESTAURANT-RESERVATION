import { object, string, type infer as Infer } from 'zod'

export const createCreateUserSchema = object({
	full_name: string({ message: 'Họ và tên không được để trống' }).min(1, 'Họ và tên không được để trống'),
	email: string({ message: 'Email không được để trống' })
		.min(1, 'Email không được để trống')
		.email('Email không hợp lệ'),
	password: string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
	role_id: string({ message: 'Vai trò không được để trống' }).min(1, 'Vai trò không được để trống')
})

export type TCreateUserSchema = Infer<typeof createCreateUserSchema>
