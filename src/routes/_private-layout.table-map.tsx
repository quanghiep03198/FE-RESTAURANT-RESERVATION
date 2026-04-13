import { getTableQueryOptions } from '@/apis/table/hooks/use-table-request'
import TableCartDetailDialog from '@/components/@table-map/table-cart-detail-dialog'
import TableFormDialog from '@/components/@table-map/table-form-dialog'
import TablesMap from '@/components/@table-map/table-map'
import TablesMapOverview from '@/components/@table-map/table-map-overview'
import UpcommingCustomer from '@/components/@table-map/upcoming-customer'
import { PageContextProvider } from '@/contexts/event-context'
import { useSeoHelper } from '@/hooks/use-seo-helper'
import { QueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/table-map')({
	component: RouteComponent,
	loader: ({ context }) => {
		if (context.queryClient instanceof QueryClient) context.queryClient.ensureQueryData(getTableQueryOptions())
	}
})

function RouteComponent() {
	const metadata = useSeoHelper('main')

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />

			<PageContextProvider>
				<div className='relative flex h-full w-full flex-1 items-stretch gap-6'>
					<div className='flex flex-1 flex-col gap-y-6'>
						<TablesMapOverview />
						<TablesMap />
					</div>
					<div className='sticky top-0 hidden xl:block'>
						<UpcommingCustomer />
					</div>
				</div>
				<TableFormDialog />
				<TableCartDetailDialog />
			</PageContextProvider>
		</>
	)
}
