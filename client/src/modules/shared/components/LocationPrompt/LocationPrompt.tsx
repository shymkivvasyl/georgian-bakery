import styles from './LocationPrompt.module.scss';

type Props = {
  onSelect: () => void;
  onClose: () => void;
};

export const LocationPrompt = ({ onSelect, onClose }: Props) => {
  return (
    <div className={styles.prompt} role="region" aria-label="Вибір пекарні">
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            d="M12.6 21.8a1 1 0 0 1-1.2 0C6.25 17.98.79 10.11 6.31 4.43A7.93 7.93 0 0 1 12 2c2.13 0 4.18.87 5.69 2.42c5.53 5.69.06 13.55-5.09 17.38"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>

      <p className={styles.text}>
        <strong>Оберіть пекарню</strong>, щоб бачити меню саме вашої точки
      </p>

      <button type="button" className={styles.selectBtn} onClick={onSelect}>
        Обрати
      </button>

      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрити">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};
