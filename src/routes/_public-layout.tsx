import PublicHeader from '@/components/layouts/@public/public-header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-layout')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<PublicHeader />
		</>
	)
}
