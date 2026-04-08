import type { NavigationSection } from '@/components/@landing/menu-dropdown'

export const navigationData: NavigationSection[] = [
	{
		title: 'Giới thiệu',
		hash: '#about-us'
	},
	{
		title: 'Đánh giá',
		hash: '#testimonials'
	},
	{
		title: 'Liên hệ',
		hash: '#contact-us'
	},
	{
		title: 'Ưu đãi',
		hash: '#offers'
	},
	{
		title: 'Đặt bàn',
		hash: undefined,
		to: '/reservation'
	}
]
