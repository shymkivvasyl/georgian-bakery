import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ProductsProvider } from './context/ProductsProvider';
import { LocationsProvider } from './context/LocationsProvider';
import { Analytics } from '@vercel/analytics/nuxt/runtime';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ProductsProvider>
      <LocationsProvider>
        <App />
        <Analytics />
      </LocationsProvider>
    </ProductsProvider>
  </Provider>,
);
