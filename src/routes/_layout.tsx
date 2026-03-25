import { PROFILE_QUERY_KEY } from '@/apis/auth/hooks/use-profile'
import AppSidebar from '@/components/partials/app-sidebar'
import Loading from '@/components/shared/loading'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AuthGuard from '@/guards/auth-guard'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
	component: RouteComponent,
	pendingComponent: Loading,
	beforeLoad: ({ context: { isAuthenticated } }) => {
		if (!isAuthenticated) throw redirect({ to: '/login' })
	},
	loader: async ({ context: { queryClient } }) => {
		return await queryClient.prefetchQuery({ queryKey: [PROFILE_QUERY_KEY] })
	}
})

function RouteComponent() {
	return (
		<AuthGuard>
			<SidebarProvider>
				<AppSidebar />
				<main>
					<SidebarTrigger />
					<Outlet />
				</main>
			</SidebarProvider>
		</AuthGuard>
	)
}
