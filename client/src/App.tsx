import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './modules/shared/components/Header/Header';
import './App.scss';
import { Footer } from './modules/shared/components/Footer/Footer';
import { MenuPage } from './modules/MenuPage/MenuPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { useState } from 'react';
import { useSelectedLocation } from './hooks/useSelectedLocation';
import { LocationsModal } from './modules/shared/components/LocationsModal';
import { ScrollTopButton } from './modules/shared/components/ScrollTopButton';
import { DevNotice } from './modules/shared/components/DevNotice';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { LocationPrompt } from './modules/shared/components/LocationPrompt';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTopButton />
    </BrowserRouter>
  );
};
