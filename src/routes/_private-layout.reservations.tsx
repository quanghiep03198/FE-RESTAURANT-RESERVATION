import { getReservationsQueryOptions } from '@/apis/reservation/hooks/use-reservation-request'
import ReservationFormDialogTrigger from '@/components/@reservation/reservation-form-dialog-trigger'
import ReservationTable from '@/components/@reservation/reservation-table'
import {
	PageAction,
	PageDescription,
	PageHeader,
	PageSeparator,
	PageTitle,
	PageWrapper
} from '@/components/layouts/@private/app-page'
import { PageContextProvider } from '@/contexts/event-context'
import { useSeoHelper } from '@/hooks/use-seo-helper'
import { QueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/reservations')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if ('queryClient' in context && context.queryClient instanceof QueryClient)
			context.queryClient.ensureQueryData(getReservationsQueryOptions())
	}
})

function RouteComponent() {
	const metadata = useSeoHelper('main')

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />

			<PageContextProvider>
				<PageWrapper>
					<PageHeader>
						<PageTitle>{metadata?.title}</PageTitle>
						<PageDescription>{metadata?.description}</PageDescription>
						<PageAction>
							<ReservationFormDialogTrigger />
						</PageAction>
					</PageHeader>
					<PageSeparator />
					<ReservationTable />
				</PageWrapper>
			</PageContextProvider>
		</>
	)
}
