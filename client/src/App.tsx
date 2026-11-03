import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import { Header } from './modules/shared/components/Header/Header';
import './App.scss';
import { Footer } from './modules/shared/components/Footer/Footer';
import { MenuPage } from './modules/MenuPage/MenuPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { Loader } from './modules/shared/components/Loader/Loader';
import { ErrorMessage } from './modules/shared/components/ErrorMessage';
import { useSelectedLocation } from './hooks/useSelectedLocation';
import { useState } from 'react';
import { LocationsModal } from './modules/shared/components/LocationsModal';
import { ScrollTopButton } from './modules/shared/components/ScrollTopButton';

export const App = () => {
  const { selectedLocation } = useSelectedLocation();
  const [showLocationModal, setShowLocationModal] = useState(selectedLocation === null);

  const { isLoading, isError } = useProducts();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <BrowserRouter>
      <Header />
      {showLocationModal && <LocationsModal onClose={() => setShowLocationModal(false)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
      <ScrollTopButton />
    </BrowserRouter>
  );
};
