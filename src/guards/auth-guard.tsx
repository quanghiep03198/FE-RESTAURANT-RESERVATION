import useAuth from '@/apis/auth/hooks/use-auth-req'
import { useGetUserProfileQuery } from '@/apis/auth/hooks/use-profile-req'
import { AuthService } from '@/apis/auth/services'
import { Spinner } from '@/components/ui/spinner'
import { Typography } from '@/components/ui/typography'
import { useRouter } from '@tanstack/react-router'
import { Fragment, useEffect } from 'react'

const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, setProfile: setUserProfile } = useAuth()
	const { data, isLoading, isError } = useGetUserProfileQuery()
	console.log('data', data)

	const router = useRouter()

	useEffect(() => {
		if (isError) AuthService.logout()
		setUserProfile(data)
	}, [data, isError])

	useEffect(() => {
		if (!isAuthenticated) router.invalidate().finally(() => router.navigate({ to: '/login' }))
	}, [isAuthenticated])

	if (isLoading)
		return (
			<Fragment>
				<title>Authenticating ...</title>

				<div className='relative inset-0 z-50 flex h-screen w-full items-center justify-center gap-x-2 antialiased'>
					<Spinner />
					<Typography variant='small' className='font-medium tracking-wide'>
						Authenticating
					</Typography>
				</div>
			</Fragment>
		)

	return children
}

export default AuthGuard
