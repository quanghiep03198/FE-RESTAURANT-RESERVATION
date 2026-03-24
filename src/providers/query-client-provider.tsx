import { AppConfigs } from '@/configs/app.config'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { AxiosError } from 'axios'
import { compress, decompress } from 'lz-string'

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: AxiosError
	}
}

const asyncLocalStoragePersister = createAsyncStoragePersister({
	storage: window.localStorage,
	key: AppConfigs.QUERY_CLIENT_CACHE_STORAGE_KEY,
	serialize: (data) => compress(JSON.stringify(data)),
	deserialize: (data) => JSON.parse(decompress(data))
})

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60,
			experimental_prefetchInRender: true,
			networkMode: 'always'
		},
		mutations: {
			networkMode: 'always'
		}
	}
})

broadcastQueryClient({
	queryClient: queryClient as unknown as Parameter<typeof broadcastQueryClient>['queryClient'],
	broadcastChannel: 'restaurant-reservation', // Optional: defaults to 'react-query'
	options: { webWorkerSupport: true, type: 'localstorage' }
})

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
	<PersistQueryClientProvider
		client={queryClient}
		persistOptions={{
			persister: asyncLocalStoragePersister,
			maxAge: 60 * 1000
		}}>
		{children}
		<ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' />
	</PersistQueryClientProvider>
)
