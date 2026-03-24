import useAuth from '@/apis/auth/hooks/use-auth'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) return <Navigate to='/login' />

	return <Navigate to='/dashboard' />
}
