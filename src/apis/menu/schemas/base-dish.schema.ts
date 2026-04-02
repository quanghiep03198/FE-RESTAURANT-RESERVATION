import { boolean, number, object, string } from 'zod'

export const baseDishSchema = object({
	name: string({ message: 'Tên món ăn là bắt buộc' }).nonempty({ message: 'Tên món ăn không được để trống' }),
	// kitchen_name: string({ message: 'Tên món ăn là bắt buộc' })
	// 	.nonempty({ message: 'Tên món ăn không được để trống' })
	// 	.optional(),
	price: number({ message: 'Giá bán hiện tại là bắt buộc' }).min(1000, { message: 'Giá bán tối thiểu là 1000' }),
	cost_price: number({ message: 'Giá vốn là bắt buộc' }).min(1000, { message: 'Giá vốn tối thiểu là 1000' }),
	unit: string({ message: 'Đơn vị tính là bắt buộc' }).nonempty({ message: 'Đơn vị tính không được để trống' }),
	description: string().optional(),
	available_from: string().refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(val), {
		message: 'Thời gian phải ở định dạng HH:mm (24 giờ)'
	}),
	available_to: string().refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(val), {
		message: 'Thời gian phải ở định dạng HH:mm (24 giờ)'
	}),
	is_featured: boolean().default(false)
	// image_url: string().optional()
})
