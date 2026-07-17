import { Link, NavLink } from "react-router-dom";
import styles from "./Footer.module.scss";
import { useState } from "react";
import { LocationsModal } from "../LocationsModal/LocationsModal";

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/Icons/logo.webp" alt="Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Грузинська випічка</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <NavLink className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.navLink_active : ''}`
        } to="/menu">Меню</NavLink>
        <NavLink className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.navLink_active : ''}`
        } to="/cart">Кошик</NavLink>
        <NavLink className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.navLink_active : ''}`
        } to="/favorites">Улюблені</NavLink>
      </nav>

      <div className={styles.info}>
        <button className={styles.locationBtn} onClick={() => setIsModalOpen(true)}>
          Наші локації
        </button>
        <a href="https://instagram.com/georgian_baking_ua" target="_blank" rel="noreferrer" className={styles.instaLink}>
          Instagram
        </a>
        <span className={styles.schedule}>Пн-Нд: 7:00 - 21:00</span>
        {isModalOpen && (
          <LocationsModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>

      <div className={styles.copy}>
        <span className={styles.copyright}>© 2026 Грузинська випічка</span>
        <a href="https://www.linkedin.com/in/vasyl-shymkiv-62127a38a/" target="_blank" rel="noreferrer" className={styles.dev}>
          Developed - Shymkiv Vasyl
        </a>
      </div>
    </footer>
  );
};