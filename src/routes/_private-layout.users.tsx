import UserTable from '@/components/@user/user-table'
import {
	PageAction,
	PageDescription,
	PageHeader,
	PageSeparator,
	PageTitle,
	PageWrapper
} from '@/components/partials/app-page'
import { Button } from '@/components/ui/button'
import { PageContextProvider } from '@/contexts/@user'

import { Plus } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/users')({
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
							<Button>
								<HugeiconsIcon icon={Plus} />
								Thêm người dùng
							</Button>
						</PageAction>
					</PageHeader>
					<PageSeparator />
					<UserTable />
				</PageWrapper>
			</PageContextProvider>
		</>
	)
}
