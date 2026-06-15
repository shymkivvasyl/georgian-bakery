import { useMenu } from "@/hooks/useMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  const {  isLoading, isError } = useMenu();

  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка при завантаженні даних</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route path="/menu" element={<div>MenuPage</div>} />
        <Route path="/cart" element={<div>CartPage</div>} />
        <Route path="/favorites" element={<div>FavoritesPage</div>} />
      </Routes>
    </BrowserRouter>
  );
}
