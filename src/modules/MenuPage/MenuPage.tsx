import { useState, useMemo } from 'react';
import { useMenu } from '@/hooks/useMenu';
import styles from './MenuPage.module.scss';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import { Dropdown } from '../shared/components/Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';
type SortBy = 'default' | 'price_asc' | 'price_desc' | 'popularity';

const sortOptions = [
  { value: 'default', label: 'За замовчуванням' },
  { value: 'price_asc', label: 'Ціна ↑' },
  { value: 'price_desc', label: 'Ціна ↓' },
  { value: 'popularity', label: 'Популярні' },
];

export const MenuPage = () => {
  const { products, isLoading, isError } = useMenu();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('default');

  const [searchParams] = useSearchParams();
  const [activeGroup, setActiveGroup] = useState(
    searchParams.get('group') || 'Все'
  );

  const groups = useMemo(() => {
    const unique = [...new Set(products.map(p => p.group))];
    return ['Все', ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    return products
      .filter(p => p.available)
      .filter(p => activeGroup === 'Все' || p.group === activeGroup)
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'popularity') return b.popularity - a.popularity;
        return 0;
      });
  }, [products, activeGroup, search, sortBy]);




  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка</div>;

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Пошук страви..."
        />
        <Dropdown
          options={sortOptions}
          value={sortBy}
          onChange={(val) => setSortBy(val as SortBy)}
        />
      </div>

      <div className={styles.filters}>
        {groups.map(group => (
          <button
            key={group}
            className={`${styles.filterBtn} ${activeGroup === group ? styles.filterBtn_active : ''}`}
            onClick={() => setActiveGroup(group)}
          >
            {group}
          </button>
        ))}
      </div>

      <div className={styles.main}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};