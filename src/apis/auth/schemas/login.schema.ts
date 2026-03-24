import { object, string, type infer as Infer } from 'zod'

export const loginSchema = object({
	username: string({ message: 'Tên đăng nhập là bắt buộc' })
		.nonempty('Tên đăng nhập là bắt buộc')
		.min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
	password: string({ message: 'Vui lòng nhập mật khẩu của bạn' }).nonempty('Vui lòng nhập mật khẩu của bạn')
})

export type TLoginFormValues = Infer<typeof loginSchema>
