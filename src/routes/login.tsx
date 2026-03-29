import useAuth from '@/apis/auth/hooks/use-auth'
import { LoginForm } from '@/components/_login/login-form'
import { createFileRoute, Navigate, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (isAuthenticated)
			throw redirect({
				to: '/floor-plan'
			})
	}
})

function RouteComponent() {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to='/floor-plan' />
	}

	return (
		<div className='bg-muted flex min-h-screen items-center justify-center p-4'>
			<LoginForm />
		</div>
	)
}
