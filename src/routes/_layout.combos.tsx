import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/combos')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_layout/combo"!</div>
}
