import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRouteWithContext, type RouteContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import '../styles.css'

export const Route = createRootRouteWithContext<RouteContext>()({
	component: RootComponent
})

function RootComponent() {
	return (
		<>
			<Outlet />
			<TanStackDevtools
				config={{
					position: 'bottom-right'
				}}
				plugins={[
					{
						name: 'TanStack Router',
						render: <TanStackRouterDevtoolsPanel />
					}
				]}
			/>
		</>
	)
}
