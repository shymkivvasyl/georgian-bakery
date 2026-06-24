import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { useSelectedLocation } from '@/hooks/useSelectedLocation';
import { useLocationsContext } from '@/hooks/useLocationsContext';
import { useState } from 'react';
import { LocationSelectModal } from '../LocationSelectModal';

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { favoritesItems } = useFavorites();
  const { cartItems } = useCart();

  const { selectedLocation } = useSelectedLocation();
  const { locations } = useLocationsContext();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const currentLocation = locations.find(loc => loc.id === selectedLocation);

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

        <button className={styles.nav_link} onClick={() => setIsLocationModalOpen(true)}>
          <img src="/images/Icons/map-pin.svg" alt="location" />
          {currentLocation ? (
            <span className={styles.locationInfo}>
              <span className={styles.locationCity}>{currentLocation.city}</span>
              <span className={styles.locationAddress}>{currentLocation.address}</span>
            </span>
          ) : 'Оберіть точку'}
        </button>
      </nav>



      {isLocationModalOpen && (
        <LocationSelectModal onClose={() => setIsLocationModalOpen(false)} />
      )}

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
