import { RecordStatus } from '@/common/constants/enums'
import { nativeEnum, object, string, type infer as Infer } from 'zod'
import { PHONE_REGEX } from '../constants'

export const updateUserSchema = object({
	full_name: string({ message: 'Họ tên không được để trống' }).min(1, 'Họ và tên không được để trống').optional(),
	phone: string({ message: 'Số điện thoại không được để trống' })
		.refine((value) => PHONE_REGEX.test(value), {
			message: 'Số điện thoại không hợp lệ'
		})
		.optional(),
	email: string({ message: 'Email không được để trống' }).email({ message: 'Email không hợp lệ' }).optional(),
	password: string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự').optional(),
	role_id: string({ message: 'Vai trò không được để trống' }).optional(),
	is_active: nativeEnum(RecordStatus, { message: 'Trạng thái không hợp lệ' }).optional()
})

export type TUpdateUserSchema = typeof updateUserSchema

export type TUpdateUserValues = Infer<typeof updateUserSchema>
