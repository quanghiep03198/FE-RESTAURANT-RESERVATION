import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-layout')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_public-layout"!</div>
}
