import type { TUserRoleCode } from '@/apis/user/types'
import type { IconProps } from '@/components/ui/icon'
import type { FileRouteTypes } from '@/route-tree.gen'

export type TNavigationConfig = {
	icon?: IconProps['name']
	title: string
	url?: FileRouteTypes['to']
	items?: Omit<TNavigationConfig, 'icon'>[]
	authorizedRoles?: TUserRoleCode[] | '*'
}
const navigationConfig: Record<'main' | 'administration', TNavigationConfig[]> = {
	main: [
		{
			title: 'Sơ đồ bàn',
			url: '/table-map',
			icon: 'Grid2x2Check',
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER', 'WAITER']
		},
		{
			title: 'Thống kê',
			url: '/analytics',
			icon: 'ChartColumnBig',
			authorizedRoles: ['OWNER', 'MANAGER']
		},
		{
			title: 'Quản lý thực đơn',
			icon: 'UtensilsCrossed',
			items: [
				{
					title: 'Danh mục món',
					url: '/categories',
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
			icon: 'Receipt',
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER']
		}
	],
	administration: [
		{
			title: 'Quản lý nhân viên',
			url: '/users',
			icon: 'Users',
			authorizedRoles: ['OWNER', 'MANAGER']
		}
	]
}

export default navigationConfig
