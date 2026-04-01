import useAuth from '@/apis/auth/hooks/use-auth-request'
import { LoginForm } from '@/components/@login/login-form'
import { Typography } from '@/components/ui/typography'
import { createFileRoute, Navigate, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (isAuthenticated)
			throw redirect({
				to: '/tables-map'
			})
	}
})

function RouteComponent() {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to='/tables-map' />
	}

	return (
		<div className='bg-muted flex min-h-screen items-center justify-center p-4'>
			<div className='mx-auto w-full max-w-lg space-y-6'>
				<div className='text-center'>
					<img src='/logo.png' alt='logo' className='mx-auto max-w-40' />
					<Typography variant='h3' className='mb-1'>
						Toque Blanche
					</Typography>
					<Typography color='muted'>Hệ thống quản lý đặt bàn</Typography>
				</div>
				<LoginForm />
			</div>
		</div>
	)
}
