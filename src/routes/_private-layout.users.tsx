import CreateUserFormDialogTrigger from '@/components/@user/create-user-dialog-form-trigger'
import UserFormDialog from '@/components/@user/user-form-dialog'
import UserTable from '@/components/@user/user-table'
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

export const Route = createFileRoute('/_private-layout/users')({
	component: RouteComponent
})

function RouteComponent() {
	const metadata = useSeoHelper('administration')

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />

			<RoleGuard authorizedRoles={['OWNER', 'MANAGER']}>
				<PageContextProvider>
					<PageWrapper>
						<PageHeader>
							<PageTitle>Quản lý Người dùng & Phân quyền</PageTitle>
							<PageDescription>
								Quản lý thông tin tài khoản và thiết lập vai trò để kiểm soát quyền truy cập hệ thống.
							</PageDescription>
							<PageAction>
								<CreateUserFormDialogTrigger />
							</PageAction>
						</PageHeader>
						<PageSeparator />
						<UserTable />
						<UserFormDialog />
					</PageWrapper>
				</PageContextProvider>
			</RoleGuard>
		</>
	)
}
