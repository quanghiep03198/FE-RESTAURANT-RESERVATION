import { nativeEnum, number, object, string, type infer as Infer } from 'zod'
import { PaymentMethod } from '../constants'

export const invoiceSchema = object({
	customer_name: string({ message: 'Vui lòng điền tên khách hàng' }).nonempty({
		message: 'Vui lòng điền tên khách hàng'
	}),
	customer_phone: string({ message: 'Vui lòng điền số điện thoại liên hệ' }).nonempty({
		message: 'Vui lòng điền số điện thoại liên hệ'
	}),
	paid_amount: number({ message: 'Vui lòng điền số tiền thanh toán' }).min(1000, { message: 'Số tiền không hợp lệ' }),
	deposit_amount: number({ message: 'Vui lòng điền số tiền thanh toán' }).default(0),
	payment_method: nativeEnum(PaymentMethod, { message: 'Vui lòng chọn phương thức thanh toán' }),
	note: string().optional()
})

export type TInvoiceValues = Infer<typeof invoiceSchema>
