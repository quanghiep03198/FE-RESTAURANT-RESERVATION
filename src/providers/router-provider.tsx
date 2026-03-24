import useAuth from '@/apis/auth/hooks/use-auth'
import NotFoundPage from '@/components/exceptions/not-found'
import type { QueryClient } from '@tanstack/react-query'
import { RouterProvider as BrowserRouterProvider, createRouter, type RouterProps } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { queryClient } from './query-client-provider'

type CreateRouterOptions = FirstParameter<typeof createRouter>

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultNotFoundComponent: NotFoundPage,
	defaultPreloadStaleTime: 0,
	defaultStructuralSharing: true,
	scrollRestoration: true
} as unknown as CreateRouterOptions)

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}

	interface RouteContext {
		queryClient: QueryClient
		isAuthenticated: boolean
	}
}

export const RouterProvider: React.FC<Pick<RouterProps, 'context'>> = ({ context: extendedContext }) => {
	const { isAuthenticated } = useAuth()

	return <BrowserRouterProvider router={router} context={{ queryClient, isAuthenticated, ...extendedContext }} />
}
