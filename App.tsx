// React
import { memo } from 'react'

// Components
import { EntryPoint } from '@/EntryPoint'

const App = memo(() => {
	return <EntryPoint />
})

App.displayName = 'App'

export { App }
