import type { TUserRoleCode } from '@/apis/user/types'
import type { IconProps } from '@/components/ui/icon'
import type { FileRouteTypes } from '@/route-tree.gen'

export type TNavigationConfig = {
	icon?: IconProps['name']
	title: string
	url?: FileRouteTypes['to']
	items?: Omit<TNavigationConfig, 'icon'>[]
	authorizedRoles?: TUserRoleCode[] | '*'
	description: string
}
const navigationConfig: Record<'main' | 'administration', TNavigationConfig[]> = {
	main: [
		{
			title: 'Sơ đồ bàn',
			url: '/table-map',
			icon: 'Grid2x2Check',
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER', 'WAITER'],
			description:
				'Xem và quản lý sơ đồ bàn thời gian thực: đặt chỗ nhanh, tối ưu sắp xếp chỗ ngồi và phân ca phục vụ để nâng cao hiệu suất nhà hàng.'
		},
		{
			title: 'Quản lý thực đơn',
			icon: 'UtensilsCrossed',
			description:
				'Quản lý toàn diện thực đơn: danh mục, món ăn và combo — cập nhật nhanh, phân loại rõ ràng và tối ưu trải nghiệm đặt món.',
			items: [
				{
					title: 'Danh mục món',
					url: '/categories',
					authorizedRoles: ['OWNER', 'MANAGER'],
					description:
						'Tạo và quản lý danh mục món ăn: phân loại, sắp xếp và cập nhật để giúp khách hàng dễ tìm và lựa chọn.'
				},
				{
					title: 'Món ăn',
					url: '/dishes',
					authorizedRoles: ['OWNER', 'MANAGER'],
					description:
						'Quản lý món ăn: thêm, chỉnh sửa thông tin, giá và hình ảnh để đảm bảo thực đơn luôn chính xác và hấp dẫn.'
				},
				{
					title: 'Combo',
					url: '/combos',
					authorizedRoles: ['OWNER', 'MANAGER'],
					description:
						'Tạo và quản lý combo khuyến mãi: ghép món, thiết lập giá ưu đãi và tăng doanh thu từ các gói món kết hợp.'
				}
			]
		},
		{
			title: 'Quản lý đặt bàn',
			url: '/reservations',
			icon: 'CalendarCheck',
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER', 'WAITER'],
			description:
				'Quản lý đặt bàn: tạo, xác nhận, chỉnh sửa và theo dõi trạng thái đặt chỗ để tối ưu trải nghiệm khách và giảm tỷ lệ hủy.'
		},
		{
			title: 'Hóa đơn',
			url: '/invoices',
			icon: 'Receipt',
			authorizedRoles: ['OWNER', 'MANAGER', 'CASHIER'],
			description:
				'Quản lý hóa đơn và thanh toán: tạo hóa đơn, theo dõi trạng thái thanh toán, in biên lai và đối soát doanh thu nhanh chóng.'
		}
	],
	administration: [
		{
			title: 'Thống kê',
			url: '/analytics',
			icon: 'ChartColumnBig',
			authorizedRoles: ['OWNER', 'MANAGER'],
			description:
				'Báo cáo và phân tích hiệu suất nhà hàng: doanh thu, đặt bàn, món bán chạy và hoạt động nhân viên để ra quyết định hiệu quả.'
		},
		{
			title: 'Quản lý nhân viên',
			url: '/users',
			icon: 'Users',
			authorizedRoles: ['OWNER', 'MANAGER'],
			description:
				'Quản lý nhân sự: tạo tài khoản, phân quyền, theo dõi ca kíp và vai trò để vận hành nhà hàng an toàn và hiệu quả.'
		}
	]
}

export default navigationConfig
