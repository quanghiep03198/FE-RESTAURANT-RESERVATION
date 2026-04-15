import CategoryFormDialog from '@/components/@category/category-form-dialog'
import CategoryFormDialogTrigger from '@/components/@category/category-form-dialog-trigger'
import CategoryTable from '@/components/@category/category-table'
import {
	PageAction,
	PageDescription,
	PageHeader,
	PageSeparator,
	PageTitle,
	PageWrapper
} from '@/components/layouts/@private/app-page'
import { PageContextProvider } from '@/contexts/event-context'
import { RoleGuard } from '@/guards/role-guard'
import { useSeoHelper } from '@/hooks/use-seo-helper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/categories')({
	component: RouteComponent
})

function RouteComponent() {
	const metadata = useSeoHelper('main')

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />

			<RoleGuard authorizedRoles={['OWNER', 'MANAGER']}>
				<PageContextProvider>
					<PageWrapper>
						<PageHeader>
							<PageTitle>Quản lý Danh mục</PageTitle>
							<PageDescription>
								Phân loại món ăn để khách hàng dễ dàng tìm kiếm trong thực đơn của nhà hàng.
							</PageDescription>
							<PageAction>
								<CategoryFormDialogTrigger />
							</PageAction>
						</PageHeader>
						<PageSeparator />
						<CategoryFormDialog />
						{/* <CategoryOverviews /> */}
						<CategoryTable />
					</PageWrapper>
				</PageContextProvider>
			</RoleGuard>
		</>
	)
}
