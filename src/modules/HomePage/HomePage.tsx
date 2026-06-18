import { BannerSlider } from '../shared/components/Banner';
import { LocationsModal } from '../shared/components/LocationsModal';
import { useMenu } from '@/hooks/useMenu';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSliders/ProductsSlider';



export const HomePage = () => {

  const { products, isLoading } = useMenu();

  const categories = useMemo(() => {
  const unique = [...new Set(products.map(p => p.group))].filter(Boolean);
  return unique.map(group => {
    const firstProduct = products.find(p => p.group === group && p.imageUrl);
    return {
      label: group.charAt(0).toUpperCase() + group.slice(1),
      group,
      img: firstProduct?.imageUrl || '/images/placeholder.png',
    };
  });
}, [products]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const top5 = useMemo(() => {
    return [...products]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
  }, [products]);

  return (
    <div className={styles.page}>

      {/* Банер */}
      <section className={styles.banner}>
        <BannerSlider />
      </section>

      {/* Про нас */}
      <section className={styles.about}>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>Про нас</h2>
          <p className={styles.aboutText}>
            Грузинська випічка — це традиції кавказької кухні у серці України.
            Ми печемо хачапурі, лаваш і слойки щодня з ранку, використовуючи
            справжні грузинські рецепти та свіжі інгредієнти. Наша місія —
            подарувати вам смак справжньої Грузії поруч з домом.
          </p>
        </div>
      </section>

      {/* Топ 5 */}
      <section className={styles.top}>
        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <ProductsSlider title="Топ страви" products={top5} />
        )}
      </section>

      {/* Категорії */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Категорії</h2>
        <div className={styles.categoriesGrid}>
          {categories.map(cat => (
            <Link
              key={cat.group}
              to={`/menu?group=${cat.group}`}
              className={styles.categoryCard}
            >
              <img src={cat.img} alt={cat.label} className={styles.categoryImg} />
              <span className={styles.categoryLabel}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Локації */}
      <section className={styles.locations}>
        <h2 className={styles.sectionTitle}>Де нас знайти</h2>
        <p className={styles.locationsText}>19 точок по всьому місту</p>
        <button
          className={styles.locationsBtn}
          onClick={() => setIsModalOpen(true)}
        >
          Переглянути локації
        </button>
        {isModalOpen && (
          <LocationsModal onClose={() => setIsModalOpen(false)} />
        )}
      </section>

    </div>
  );
};