import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { favoritesItems } = useFavorites();

  return (
    <header className={styles.header}>
      <div className={styles.navLogo}>
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/">Головна</NavLink>
        <NavLink to="/menu">Меню</NavLink>
      </nav>
      <div className={styles.icons}>
        <Link to="/favorites" className={styles.icon}>
          ♡
          {favoritesItems.length > 0 && (
            <span className={styles.count}>{favoritesItems.length}</span>
          )}
        </Link>
        <Link to="/cart" className={styles.icon}>
          🛒
          {cartItems.length > 0 && (
            <span className={styles.count}>{cartItems.length}</span>
          )}
        </Link>
      </div>
      <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src="/burger.png" alt="Menu" />
      </button>
    </header>
  );
}