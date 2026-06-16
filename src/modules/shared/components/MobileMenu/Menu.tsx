import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { favoritesItems } = useFavorites();
  const { cartItems } = useCart();

  return (
    <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ''}`}>
      <header className={styles.header}>
        <div className={styles.navLogo}>
          <Link to="/" className={styles.logo}>
            <img src="/images/Icons/logo.png" alt="Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Грузинська  випічка</span>
          </Link>
        </div>
        <button className={styles.close} onClick={onClose}>
          <img
            className={styles.icon}
            src="/images/Icons/Close.svg"
            alt="Close_Menu"
          />
        </button>
      </header>

      <nav className={styles.nav_links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
          }
          onClick={onClose}
        >
          Головна
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
          }
          onClick={onClose}
        >
          Меню
        </NavLink>
      </nav>

      <footer className={styles.footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.footerItem} ${isActive ? styles.footerItem_active : ''}`
          }
          onClick={onClose}
        >
          <img src="/images/Icons/Favourites_(Heart_Like).svg" alt="Favorites" />
          {favoritesItems.length > 0 && (
            <span className={styles.count}>{favoritesItems.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.footerItem} ${isActive ? styles.footerItem_active : ''}`
          }
          onClick={onClose}
        >
          <img src="/images/Icons/cart.svg" alt="Shopping bag " />
          {cartItems.length > 0 && (
            <span className={styles.count}>{cartItems.length}</span>
          )}
        </NavLink>
      </footer>
    </div>
  );
};
