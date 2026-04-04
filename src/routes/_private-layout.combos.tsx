import { getCombosQueryOptions } from '@/apis/menu/hooks/use-combo-request'
import { PageAction, PageDescription, PageHeader, PageTitle, PageWrapper } from '@/components/layouts/@private/app-page'
import { PageContextProvider } from '@/contexts/event-context'
import { QueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { eachDayOfInterval, format } from 'date-fns'
import { vi } from 'date-fns/locale'

const daysOfWeek = eachDayOfInterval({ start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 6)) })

const weekdays = daysOfWeek.map((day) => format(day, 'EEEEE', { locale: vi }))

console.log(weekdays) // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
						<PageAction></PageAction>
					</PageHeader>
				</PageWrapper>
			</PageContextProvider>
		</>
	)
}
