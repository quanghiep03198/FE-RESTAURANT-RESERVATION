import { PageDescription, PageHeader, PageTitle } from '@/components/layouts/@private/app-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/analytics')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<PageHeader>
				<PageTitle>Thống kê</PageTitle>
				<PageDescription>
					Đây là trang thống kê, nơi bạn có thể xem các báo cáo và phân tích về hoạt động của nhà hàng. Bạn có thể
					theo dõi doanh thu, số lượng đặt bàn, và các chỉ số quan trọng khác để quản lý hiệu quả hơn.
				</PageDescription>
			</PageHeader>
		</>
	)
}
