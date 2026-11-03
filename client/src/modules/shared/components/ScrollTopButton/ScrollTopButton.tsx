import { useEffect, useState } from 'react';
import styles from './ScrollTopButton.module.scss';

const SHOW_AFTER = 400;

export const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.button_visible : ''}`}
      onClick={scrollToTop}
      aria-label="Нагору"
      tabIndex={isVisible ? 0 : -1}
    >
      <img src="/images/Icons/logo.webp" alt="" className={styles.logo} />

      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path
            d="M3.5 10.5 8 6l4.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};
