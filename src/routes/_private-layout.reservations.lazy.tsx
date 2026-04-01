import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_private-layout/reservations')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_layout/reservations"!</div>
}
