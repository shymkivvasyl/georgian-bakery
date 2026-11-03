import { useFavorites } from '@/hooks/useFavorites';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import styles from './FavoritesPage.module.scss';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { PageMeta } from '../shared/components/PageMeta/PageMeta.tsx';

export const FavoritesPage = () => {
  const { favoritesItems } = useFavorites();

  if (favoritesItems.length === 0) {
    return (
      <>
        <PageMeta title="Улюблене" description="Ваші улюблені товари." path="/favorites" noindex />
        <ErrorMessage message="Улюблених немає" />
        <div className={styles.empty}>
          <Link to="/menu" className={styles.emptyLink}>
            Перейти до меню
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styles.page}>
      <PageMeta title="Улюблене" description="Ваші улюблені товари." path="/favorites" noindex />
      <h1 className={styles.title}>Улюблені</h1>
      <div className={styles.grid}>
        {favoritesItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
