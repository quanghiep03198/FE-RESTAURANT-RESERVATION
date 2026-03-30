import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private-layout/users')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_layout/user-management"!</div>
}
