import { PROFILE_QUERY_KEY } from '@/apis/auth/hooks/use-profile-req'
import { ErrorBoundaryFallback } from '@/components/exceptions/error-boundar-fallback'
import AppNavbar from '@/components/partials/app-navbar'
import AppSidebar from '@/components/partials/app-sidebar'
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
				<LayoutWrapper
					style={
						{
							'--outlet-padding': '12px',
							'--header-height': '56px',
							'--outlet-wrapper-height':
								'calc(var(--screen-height,100dvh)*1px - var(--header-height) - 2*var(--outlet-padding))',
							'--scrollbar-thickness': '10px'
						} as React.CSSProperties
					}>
					<OutletWrapper>
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
					</OutletWrapper>
					<AppNavbar />
				</LayoutWrapper>
			</SidebarProvider>
		</AuthGuard>
	)
}

const LayoutWrapper: React.FC<React.ComponentProps<'div'>> = tw.div`
	relative min-h-screen max-h-full flex-1 overflow-y-scroll @container/layout-wrapper flex flex-col justify-between
	[counter-reset:h_var(--screen-height)_w_var(--screen-width)]
	(--scrollbar-thickness:10px) 
	[--outlet-padding:12px] 
	[--header-height:56px] 
	[--outlet-wrapper-height:calc(var(--screen-height,100dvh)*1px-var(--header-height)-2*var(--outlet-padding))]
	xxl:[--header-height:80px]
`

const OutletWrapper: React.FC<React.ComponentProps<'main'>> = tw.main`
	relative flex-1 basis-full py-(--outlet-padding) xxl:px-6 xl:px-4 lg:px-4 md:px-2 sm:px-2 min-h-(--outlet-wrapper-height)
`
