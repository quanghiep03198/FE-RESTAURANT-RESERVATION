import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/dashboard')({
	component: RouteComponent
})

function RouteComponent() {
	console.log('Welcome back')
	return <div>Hello "/_layout/dashboard"!</div>
}
