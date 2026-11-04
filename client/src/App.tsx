import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './modules/shared/components/Header/Header';
import './App.scss';
import { Footer } from './modules/shared/components/Footer/Footer';
import { MenuPage } from './modules/MenuPage/MenuPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { useSelectedLocation } from './hooks/useSelectedLocation';
import { useState } from 'react';
import { LocationsModal } from './modules/shared/components/LocationsModal';
import { ScrollTopButton } from './modules/shared/components/ScrollTopButton';
import { DevNotice } from './modules/shared/components/DevNotice';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App = () => {
  const { selectedLocation } = useSelectedLocation();
  const [isLocationModalClosed, setIsLocationModalClosed] = useState(false);

  const showLocationModal = selectedLocation === null && !isLocationModalClosed;

  return (
    <BrowserRouter>
      <DevNotice />
      <Header />
      {showLocationModal && <LocationsModal onClose={() => setIsLocationModalClosed(true)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ScrollTopButton />
    </BrowserRouter>
  );
};
