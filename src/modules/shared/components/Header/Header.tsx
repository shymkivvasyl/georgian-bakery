import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";
import { MobileMenu } from "../MobileMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { favoritesItems } = useFavorites();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navLogo}>
            <Link to="/" className={styles.logo}>
              <img src="/images/Icons/logo.png" alt="Logo" className={styles.logoImg} />
              <span className={styles.logoText}>Грузинська випічка</span>
            </Link>
          </div>
          <nav className={styles.nav}>
            <NavLink className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLink_active : ''}`
            } to="/">Головна</NavLink>
            <NavLink className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLink_active : ''}`
            } to="/menu">Меню</NavLink>
          </nav>
        </div>

        <div className={styles.icons}>
          <NavLink to="/favorites" className={({ isActive }) =>
            `${styles.icon} ${isActive ? styles.icon_active : ''}`
          }>
            <img src="/images/Icons/Favourites_(Heart_Like).svg" alt="Favourites" />
            {favoritesItems.length > 0 && (
              <span className={styles.count}>{favoritesItems.length}</span>
            )}
          </NavLink>
          <NavLink to="/cart"
            className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.icon_active : ''}`
            }
          >
            <img src="/images/Icons/cart.svg" alt="cart" />
            {cartItems.length > 0 && (
              <span className={styles.count}>{cartItems.length}</span>
            )}
          </NavLink>
        </div>
        <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src="/images/Icons/Menu.svg" alt="Menu" />
        </button>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}