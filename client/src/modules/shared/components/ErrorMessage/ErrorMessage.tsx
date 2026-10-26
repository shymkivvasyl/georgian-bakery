import styles from './ErrorMessage.module.scss';

type Props = {
  message?: string;
};

export const ErrorMessage = ({ message = 'Щось пішло не так. Спробуйте пізніше.' }: Props) => {
  return (
    <div className={styles.wrapper}>
      <img src="/images/error.webp" alt="error" className={styles.img} />
      <p className={styles.text}>{message}</p>
    </div>
  );
};