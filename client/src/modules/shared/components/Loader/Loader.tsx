import styles from './Loader.module.scss';

const CHEESE_PATH =
  'M28 50 C 26 42 36 36 44 38 C 48 34 58 34 62 38 C 70 36 76 44 72 50 C 76 56 70 64 62 62 C 58 66 48 66 44 62 C 36 64 26 58 28 50 Z';

export const Loader = () => {
  return (
    <div className={styles.wrapper} role="status" aria-label="Завантаження">
      <div className={styles.brand} aria-hidden="true">
        <span className={styles.text}>Грузинська випічка</span>

        <span className={styles.iconWrap}>
          <svg className={styles.icon} viewBox="4 14 92 72">
            <g transform="rotate(-25 50 50)">
              <path
                className={styles.dough}
                d="M10 50 C 6 46 12 40 20 37 C 36 26 64 26 80 37 C 88 40 94 46 90 50 C 94 54 88 60 80 63 C 64 74 36 74 20 63 C 12 60 6 54 10 50 Z"
              />
              <path className={styles.cheeseFill} d={CHEESE_PATH} />
              <path className={styles.cheese} d={CHEESE_PATH} />
              <circle className={styles.yolk} cx="50" cy="50" r="8" />
              <path className={styles.marks} d="M19 45 Q 16 50 19 55 M81 45 Q 84 50 81 55" />
            </g>
          </svg>
        </span>
      </div>

      <div className={styles.spinner} />
    </div>
  );
};
