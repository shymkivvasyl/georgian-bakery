import styles from './DevNotice.module.scss';

export const DevNotice = () => (
  <div className={styles.notice} role="status">
    Демо-версія сайту: замовлення не приймаються, а ціни й асортимент можуть відрізнятися від
    актуальних.{' '}
  </div>
);
