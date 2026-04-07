import type { IconProps } from '@/components/ui/icon'

export type ContactInfo = {
	title: string
	icon: IconProps['name']
	description: string
}[]

export const contactInfo: ContactInfo = [
	{
		title: 'Giờ mở cửa',
		icon: 'Clock8',
		description: 'Thứ Hai - Chủ Nhật\n7:30 - 22:00'
	},
	{
		title: 'Địa chỉ cửa hàng',
		icon: 'MapPin',
		description: '233A Trần Nguyên Hãn, Quận Lê Chân\nTP. Hải Phòng'
	},
	{
		title: 'Email hỗ trợ',
		icon: 'Mail',
		description: 'hello@jollyfastfood.vn'
	},
	{
		title: 'Hotline',
		icon: 'Phone',
		description: '0909 123 456'
	}
]
