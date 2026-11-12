import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './modules/shared/components/Header/Header';
import './App.scss';
import { Footer } from './modules/shared/components/Footer/Footer';
import { HomePage } from './modules/HomePage';
import { useSelectedLocation } from './hooks/useSelectedLocation';
import { LocationsModal } from './modules/shared/components/LocationsModal';
import { ScrollTopButton } from './modules/shared/components/ScrollTopButton';
import { DevNotice } from './modules/shared/components/DevNotice';
import { LocationPrompt } from './modules/shared/components/LocationPrompt';
import { lazy, Suspense, useState } from 'react';
import { Loader } from './modules/shared/components/Loader/Loader';

const MenuPage = lazy(() =>
  import('./modules/MenuPage/MenuPage').then((module) => ({ default: module.MenuPage })),
);

const CartPage = lazy(() =>
  import('./modules/CartPage/CartPage').then((module) => ({ default: module.CartPage })),
);

const NotFoundPage = lazy(() =>
  import('./modules/NotFoundPage/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);

const FavoritesPage = lazy(() =>
  import('./modules/FavoritesPage/FavoritesPage').then((module) => ({
    default: module.FavoritesPage,
  })),
);

export const App = () => {
  const { selectedLocation } = useSelectedLocation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(true);

  const showLocationPrompt = selectedLocation === null && isPromptOpen;

  return (
    <BrowserRouter>
      <DevNotice />
      <Header />
      {showLocationPrompt && (
        <LocationPrompt
          onSelect={() => setIsLocationModalOpen(true)}
          onClose={() => setIsPromptOpen(false)}
        />
      )}
      {isLocationModalOpen && <LocationsModal onClose={() => setIsLocationModalOpen(false)} />}
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollTopButton />
    </BrowserRouter>
  );
};
