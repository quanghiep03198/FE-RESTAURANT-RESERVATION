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
} from '@/components/private-layout-partials/app-page'
import { PageContextProvider } from '@/contexts/event-context'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_private-layout/categories')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<title>Quản lý Danh mục</title>
			<meta name='description' content='Quản lý danh mục món ăn trong nhà hàng' />

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
		</>
	)
}
