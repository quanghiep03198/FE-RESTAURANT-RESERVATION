import useAuth from '@/apis/auth/hooks/use-auth'
import { LoginForm } from '@/components/_login/login-form'
import { createFileRoute, Navigate, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (isAuthenticated)
			throw redirect({
				to: '/dashboard'
			})
	}
})

function RouteComponent() {
	const { isAuthenticated, accessToken } = useAuth()

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />
	}

	return (
		<div className='bg-muted flex min-h-screen items-center justify-center p-4'>
			<LoginForm />
		</div>
	)
}
