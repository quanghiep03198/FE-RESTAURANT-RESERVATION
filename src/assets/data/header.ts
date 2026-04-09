import type { NavigationSection } from '@/components/@landing/menu-dropdown'

export const navigationData: NavigationSection[] = [
	{
		title: 'Giới thiệu',
		to: '/',
		hash: '#about-us'
	},
	{
		title: 'Đánh giá',
		to: '/',
		hash: '#testimonials'
	},
	{
		title: 'Liên hệ',
		to: '/',
		hash: '#contact-us'
	},
	{
		title: 'Ưu đãi',
		to: '/',
		hash: '#offers'
	},
	{
		title: 'Đặt bàn',
		hash: '',
		to: '/reservation'
	}
]
