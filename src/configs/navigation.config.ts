import type { TUserRoleCode } from '@/apis/auth/types'
import type { FileRouteTypes } from '@/route-tree.gen'
import { Appointment01Icon, Dish02Icon, Invoice01Icon, LayoutGrid } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export type TNavigationConfig = {
	icon?: IconSvgElement
	title: string
	url?: FileRouteTypes['to']
	items?: Omit<TNavigationConfig, 'icon'>[]
	authorizedRoles?: TUserRoleCode[] | '*'
}
const navigationConfig: Record<'main' | 'administration', TNavigationConfig[]> = {
	main: [
		{
			title: 'Sơ đồ chỗ ngồi',
			url: '/floor-plan',
			icon: LayoutGrid,
			authorizedRoles: '*'
		},
		{
			title: 'Đặt bàn',
			url: '/reservations',
			icon: Appointment01Icon,
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER', 'WAITER']
		},
		{
			title: 'Quản lý thực đơn',
			icon: Dish02Icon,
			items: [
				{
					title: 'Danh mục món',
					url: '/dish-categories',
					authorizedRoles: ['OWNER', 'MANAGER']
				},
				{
					title: 'Món ăn',
					url: '/dishes',
					authorizedRoles: ['OWNER', 'MANAGER']
				},
				{
					title: 'Combo',
					url: '/combos',
					authorizedRoles: ['OWNER', 'MANAGER']
				}
			]
		},
		{
			title: 'Hóa đơn',
			url: '/invoices',
			icon: Invoice01Icon,
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER']
		}
	],
	administration: [
		{
			title: 'Quản lý nhân viên',
			url: '/users',
			icon: Appointment01Icon,
			authorizedRoles: ['OWNER', 'MANAGER']
		}
	]
}

export default navigationConfig
