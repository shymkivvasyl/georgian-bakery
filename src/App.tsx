import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";
import { Header } from "./modules/shared/components/Header/Header";
import './App.scss'
import { Footer } from "./modules/shared/components/Footer/Footer";
import { MenuPage } from "./modules/MenuPage/MenuPage";
import { CartPage } from "./modules/CartPage/CartPage";
import { FavoritesPage } from "./modules/FavoritesPage/FavoritesPage";

export const App = () => {
  const { isLoading, isError } = useProducts();
  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка</div>;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
