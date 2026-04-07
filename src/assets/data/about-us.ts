import type { IconProps } from '@/components/ui/icon'

export type Stat = {
	icon: IconProps['name']
	value: string
	description: string[]
}

export const stats: Stat[] = [
	{
		icon: 'Sparkles',
		value: '12+',
		description: ['Năm phục vụ', 'món nhanh chất lượng']
	},
	{
		icon: 'ChefHat',
		value: '35+',
		description: ['Món burger, gà rán', 'và món ăn kèm']
	},
	{
		icon: 'Users',
		value: '1500+',
		description: ['Đơn hàng phục vụ', 'mỗi tháng']
	},
	{
		icon: 'Trophy',
		value: '4.8/5',
		description: ['Điểm hài lòng', 'từ khách hàng']
	}
]
