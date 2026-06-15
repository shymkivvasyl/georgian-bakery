import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";
import { Header } from "./modules/shared/components/Header/Header";

export const App = () => {
  const { isLoading, isError } = useProducts();
  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка</div>;
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route path="/menu" element={<div>MenuPage</div>} />
        <Route path="/cart" element={<div>CartPage</div>} />
        <Route path="/favorites" element={<div>FavoritesPage</div>} />
      </Routes>
    </BrowserRouter>
  );
}
