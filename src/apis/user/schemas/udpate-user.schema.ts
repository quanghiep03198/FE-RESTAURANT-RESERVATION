import { object, string, type infer as Infer } from 'zod'

export const updateUserSchema = object({
	full_name: string({ message: 'Họ và tên không được để trống' }).min(1, 'Họ và tên không được để trống').nullish(),
	email: string({ message: 'Email không được để trống' }).email().nullish(),
	password: string({ message: 'Mật khẩu phải có ít nhất 6 ký tự' })
		.min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
		.nullish(),
	role_id: string({ message: 'Vai trò không được để trống' }).min(1, 'Vai trò không được để trống').nullish()
})

export type TUpdateUserSchema = Infer<typeof updateUserSchema>
