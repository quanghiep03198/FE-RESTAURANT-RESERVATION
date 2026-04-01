import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_private-layout/tables-map')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_layout/tables-map"!</div>
}
