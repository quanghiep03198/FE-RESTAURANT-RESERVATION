import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/reservations')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_layout/reservations"!</div>
}
