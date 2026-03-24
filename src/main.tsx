import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'
import App from './app'
import env from './common/utils/env'

const runtimeEnvironment = env<RuntimeEnvironment>('VITE_NODE_ENV')

const isProduction = runtimeEnvironment === 'production'
const isDevelopment = runtimeEnvironment === 'development'

// React Scan Initialization
scan({ enabled: true })

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(<App />)
}
