import { PROFILE_QUERY_KEY } from '@/apis/auth/hooks/use-profile-request'
import { ErrorBoundaryFallback } from '@/components/exceptions/error-boundar-fallback'
import AppNavbar from '@/components/private-layout-partials/app-navbar'
import AppSidebar from '@/components/private-layout-partials/app-sidebar'
import Loading from '@/components/shared/loading'
import { SidebarProvider } from '@/components/ui/sidebar'
import AuthGuard from '@/guards/auth-guard'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'
import tw from 'tailwind-styled-components'

export const Route = createFileRoute('/_private-layout')({
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
				<LayoutWrapper data-slot='layout-wrapper'>
					<OutletWrapper data-slot='outlet-wrapper'>
						<ErrorBoundary
							fallbackRender={({ error, resetErrorBoundary }) => {
								return (
									<ErrorBoundaryFallback
										error={error as Error}
										resetError={(args) => {
											resetErrorBoundary(args)
										}}
									/>
								)
							}}>
							<Outlet />
						</ErrorBoundary>
					</OutletWrapper>{' '}
					<AppNavbar />
				</LayoutWrapper>
			</SidebarProvider>{' '}
		</AuthGuard>
	)
}

const LayoutWrapper: React.FC<React.ComponentProps<'div'>> = tw.div`
	relative bg-secondary h-screen max-h-full flex-1 w-full overflow-y-scroll @container/layout-wrapper flex flex-col justify-between
	[counter-reset:h_var(--screen-height)_w_var(--screen-width)]
	
	xxl:[--header-height:80px]
	sm:[--outlet-padding-x:4px] 
	md:[--outlet-padding-x:4px] 
	xl:[--outlet-padding-x:16px] 
	xxl:[--outlet-padding-x:24px] 
	[&:has(*[data-outlet-padding=none])]:[--outlet-padding-x:0px]
	[&:has(*[data-outlet-padding=none])]:[--outlet-padding-y:0px]
	[--scrollbar-thickness:10px] 
	[--outlet-padding-y:12px] 
	[--header-height:56px] 
	[--outlet-wrapper-width:calc(var(--screen-width,100dvw)*1px-var(--sidebar-width)-2*var(--outlet-padding-x)-var(--scrollbar-thickness))]
	[--outlet-wrapper-height:calc(var(--screen-height,100dvh)*1px-var(--header-height)-2*var(--outlet-padding-x))]
`

const OutletWrapper: React.FC<React.ComponentProps<'main'>> = tw.main`
	relative flex-1 basis-full 
	py-(--outlet-padding-y) px-(--outlet-padding-x) 
	min-h-(--outlet-wrapper-height) max-w-(--outlet-wrapper-width)
	
`
