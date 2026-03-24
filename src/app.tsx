import React from 'react'
import { Toaster } from './components/ui/sonner'
import { QueryClientProvider } from './providers/query-client-provider'
import { RouterProvider } from './providers/router-provider'

const App: React.FC = () => {
	return (
		<QueryClientProvider>
			<RouterProvider />
			<Toaster className='pointer-events-auto' position='top-right' duration={2000} />
		</QueryClientProvider>
	)
}

export default App
