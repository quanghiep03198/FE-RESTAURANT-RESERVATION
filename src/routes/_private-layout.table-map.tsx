import { getTableQueryOptions } from '@/apis/table/hooks/use-table-request'
import TableMap from '@/components/@table-map/table-map'
import TablesMapOverview from '@/components/@table-map/table-map-overview'
import UpcommingCustomer from '@/components/@table-map/upcoming-customer'
import { QueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/table-map')({
	component: RouteComponent,
	loader: ({ context }) => {
		if (context.queryClient instanceof QueryClient) context.queryClient.ensureQueryData(getTableQueryOptions())
	}
})

function RouteComponent() {
	return (
		<>
			<title>Sơ đồ bàn & Trạng thái</title>
			<meta name='description' content='Quản lý bàn trạng thái sử dụng' />

			<div className='flex w-full flex-1 items-stretch gap-6'>
				<div className='flex flex-1 flex-col gap-y-6'>
					<TablesMapOverview />
					<TableMap />
				</div>
				<UpcommingCustomer />
			</div>
		</>
	)
}
