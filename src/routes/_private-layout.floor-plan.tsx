import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/floor-plan')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_layout/floor-plan"!</div>
}
