import styles from './DevNotice.module.scss';

export const DevNotice = () => (
  <div className={styles.notice} role="status">
    Сайт у розробці — замовлення тут поки що не приймаються.
  </div>
);
