import { BannerSlider } from '../shared/components/Banner';
import { LocationsModal } from '../shared/components/LocationsModal';
import { useMenu } from '@/hooks/useMenu';
import { useLocations } from '@/hooks/useLocations';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSliders/ProductsSlider';
import { Loader } from '../shared/components/Loader/Loader';



export const HomePage = () => {

  const { products, isLoading } = useMenu();
  const { locations } = useLocations();

  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.group))].filter(Boolean);
    return unique.map(group => {
      const firstProduct = products.find(p => p.group === group && p.imageUrl && p.available);
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
      .filter(p => p.available)
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
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>Про нас</h2>
            <p className={styles.aboutText}>
              <p>
                <strong>Грузинська випічка —</strong> це більше ніж їжа, це частина культурної ідентичності Грузії, що формувалася століттями на перехресті торгових шляхів між Європою та Азією.
              </p>
              <p>
                <strong>Хачапурі —</strong> найвідоміша грузинська страва — має понад 10 регіональних варіацій. Найзнаменитіша хачапурі по-аджарськи у формі човника із сиром всередині та яйцем зверху символізує Чорне море і сонце, що сходить над ним.
              </p>
              <p>
                <strong>Лаваш</strong> у Грузії готують у спеціальній печі тоне — глиняній печі циліндричної форми, де тісто випікають прямо на гарячих стінках. У 2016 році традиція випічки грузинського хліба у тоне була визнана ЮНЕСКО нематеріальною культурною спадщиною людства.
              </p>
              <p>
                Грузинська випічка традиційно готується з сулугуні — унікального розсільного сиру, який тягнеться як моцарела, але має особливий кисломолочний смак. Наша місія — подарувати вам смак справжньої Грузії поруч з домом.
              </p>
            </p>
          </div>
        </div>
      </section>

      {/* Топ 5 */}
      <section className={styles.top}>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductsSlider title="Топ страви" products={top5} />
        )}
      </section>

      {/* Категорії */}
      <section className={styles.categories}>
        <div className={styles.categoriesInner}>
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
        </div>
      </section>

      {/* Локації */}
      <section className={styles.locations}>
        <h2 className={styles.sectionTitle}>Де нас знайти</h2>
        <p className={styles.locationsText}>{locations.length} точок по всьому місту</p>
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