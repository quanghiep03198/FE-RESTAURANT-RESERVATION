import useAuth from '@/apis/auth/hooks/use-auth-request'
import { cn } from '@/common/utils/cn'
import { LoginForm } from '@/components/@login/login-form'

import { Typography, typographyVariants } from '@/components/ui/typography'
import { createFileRoute, Link, Navigate, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (isAuthenticated)
			throw redirect({
				to: '/table-map'
			})
	}
})

function RouteComponent() {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated) {
		return <Navigate to='/table-map' />
	}

	return (
		<div className='bg-muted flex min-h-screen items-center justify-center p-4'>
			<div className='mx-auto w-full max-w-lg space-y-6'>
				<div className='flex flex-col items-center gap-2'>
					<Link
						className={cn(
							typographyVariants({
								variant: 'h1',
								className: 'sour-gummy text-primary block leading-none tracking-wide'
							})
						)}>
						Jolly Fast Food
					</Link>
					<Typography color='muted'>Hệ thống quản lý đặt bàn</Typography>
				</div>
				<LoginForm />
			</div>
		</div>
	)
}
