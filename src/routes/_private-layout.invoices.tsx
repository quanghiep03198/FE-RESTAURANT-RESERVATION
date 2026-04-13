import { getInvoicesQueryOptions } from '@/apis/invoice/hooks/use-invoice-request'
import InvoiceTable from '@/components/@invoices/invoice-table'
import {
	PageDescription,
	PageHeader,
	PageSeparator,
	PageTitle,
	PageWrapper
} from '@/components/layouts/@private/app-page'
import { useSeoHelper } from '@/hooks/use-seo-helper'
import { QueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/invoices')({
	component: RouteComponent,
	loader: ({ context }) => {
		if (context.queryClient instanceof QueryClient) context.queryClient.ensureQueryData(getInvoicesQueryOptions())
	}
})

function RouteComponent() {
	const metadata = useSeoHelper('main')

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />

			<PageWrapper>
				<PageHeader>
					<PageTitle>{metadata?.title}</PageTitle>
					<PageDescription>{metadata?.description}</PageDescription>
				</PageHeader>
				<PageSeparator />
				<InvoiceTable />
			</PageWrapper>
		</>
	)
}
