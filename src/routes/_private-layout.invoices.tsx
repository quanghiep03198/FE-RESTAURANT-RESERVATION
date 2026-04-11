import { useSeoHelper } from '@/hooks/use-seo-helper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/invoices')({
	component: RouteComponent
})

function RouteComponent() {
	const metadata = useSeoHelper('main')

	return (
		<>
			<title>{metadata?.title}</title>
			<meta name='description' content={metadata?.description} />
		</>
	)
}
