import { getCombosQueryOptions } from '@/apis/menu/hooks/use-combo-request'
import ComboFormDialog from '@/components/@combo/combo-form-dialog'
import ComboFormDialogTrigger from '@/components/@combo/combo-form-dialog-trigger'
import ComboItemList from '@/components/@combo/combo-item-list'
import ComboListToolbar from '@/components/@combo/combo-list-toolbar'
import {
	PageAction,
	PageDescription,
	PageHeader,
	PageSeparator,
	PageTitle,
	PageWrapper
} from '@/components/layouts/@private/app-page'
import { PageContextProvider } from '@/contexts/event-context'
import { QueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/combos')({
	component: RouteComponent,
	loader: ({ context }) => {
		if ('queryClient' in context && context.queryClient instanceof QueryClient)
			context.queryClient.ensureQueryData(getCombosQueryOptions())
	}
})

function RouteComponent() {
	return (
		<>
			<title>Combo & Ưu đãi</title>
			<meta name='description' content='Quản lý & Tối ưu hóa doanh thu thông qua các gói dịch vụ đặc biệt' />

			<PageContextProvider>
				<PageWrapper>
					<PageHeader>
						<PageTitle>Quản lý Combo & Ưu đãi</PageTitle>
						<PageDescription>Quản lý & Tối ưu hóa doanh thu thông qua các gói dịch vụ đặc biệt</PageDescription>
						<PageAction>
							<ComboFormDialogTrigger />
						</PageAction>
					</PageHeader>
					<PageSeparator />
					<ComboListToolbar />
					<ComboItemList />
					<ComboFormDialog />
				</PageWrapper>
			</PageContextProvider>
		</>
	)
}
