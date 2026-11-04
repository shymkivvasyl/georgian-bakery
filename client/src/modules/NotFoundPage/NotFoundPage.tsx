import { Link } from 'react-router-dom';
import { PageMeta } from '../shared/components/PageMeta/PageMeta.tsx';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <PageMeta
        title={'Сторінку не знайдено'}
        description={
          'Можливо, сторінку перенесли або в адресі помилка, перейдіть до меню або головної сторінки по посиланню. '
        }
        noindex
      />
      <h1 className={styles.title}>Сторінку не знайдено 404</h1>
      <img className={styles.img} src="/images/error.webp" alt="Сумне хачапурі" />
      <div className={styles.actions}>
        <Link to={'/menu'} className={styles.link}>
          {' '}
          {'>'} До меню
        </Link>
        <Link to={'/'} className={styles.link}>
          {'>'} На головну
        </Link>
      </div>
    </div>
  );
};
