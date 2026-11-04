import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { Analytics } from '@vercel/analytics/nuxt/runtime';
import { SpeedInsights } from '@vercel/speed-insights/nuxt/runtime';
import { ProductsProvider } from './context/ProductsProvider';
import { LocationsProvider } from './context/LocationsProvider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ProductsProvider>
      <LocationsProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </LocationsProvider>
    </ProductsProvider>
  </Provider>,
);
