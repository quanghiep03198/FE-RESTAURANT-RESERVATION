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
} from '@/components/private-layout-partials/app-page'
import { PageContextProvider } from '@/contexts/event-context'

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_private-layout/users')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<title>Quản lý người dùng</title>
			<meta name='description' content='Quản lý danh nhân viên trong quán' />

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
		</>
	)
}
