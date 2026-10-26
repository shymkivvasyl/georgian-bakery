import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { ProductsProvider } from './context/ProductsContext'
import { LocationsProvider } from './context/LocationsContext'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <ProductsProvider>
        <LocationsProvider>
          <App />
        </LocationsProvider>
      </ProductsProvider>
    </Provider>,
)