// React
import { memo } from 'react'

// Components
import { EntryPoint } from '@/EntryPoint'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'

// Safe Area Context
import { SafeAreaProvider } from 'react-native-safe-area-context'

// React Redux
import { Provider } from 'react-redux'

// Redux Persist
import { PersistGate } from 'redux-persist/integration/react'

// Store
import { store, persistor } from '@/plugins/redux'

// Gluestack
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@/plugins/glue-stack'

// React Native Confirm Toast
import { Root as PopupRootProvider } from 'react-native-popup-confirm-toast'

const App = memo(() => {
	return (
		<PopupRootProvider>
			<GluestackUIProvider config={config}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<SafeAreaProvider>
							<NavigationContainer>
								<EntryPoint />
							</NavigationContainer>
						</SafeAreaProvider>
					</PersistGate>
				</Provider>
			</GluestackUIProvider>
		</PopupRootProvider>
	)
})

App.displayName = 'App'

export { App }
