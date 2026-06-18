import { useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import type { Product } from '@/types';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setIsStart(el.scrollLeft <= 10);
    setIsEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  const handleNext = () => {
    const card = sliderRef.current?.querySelector(`.${styles.card}`) as HTMLElement;
    const cardWidth = card?.offsetWidth + 16;
    sliderRef.current?.scrollBy({ left: cardWidth });
  };

  const handlePrev = () => {
    const card = sliderRef.current?.querySelector(`.${styles.card}`) as HTMLElement;
    const cardWidth = card?.offsetWidth + 16;
    sliderRef.current?.scrollBy({ left: -cardWidth });
  };

  return (
    <article className={styles.productsSlider}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.headerButtons}>
          <button
            disabled={isStart}
            className={isStart ? styles.iconDisabled : styles.icon}
            onClick={handlePrev}
          >
            <img src="/images/Icons/Chevron_(Arrow_Left).svg" alt="prev" />
          </button>
          <button
            disabled={isEnd}
            className={isEnd ? styles.iconDisabled : styles.icon}
            onClick={handleNext}
          >
            <img src="/images/Icons/Chevron_(Arrow_Right).svg" alt="next" />
          </button>
        </div>
      </header>

      <div className={styles.windowSlider} ref={sliderRef} onScroll={handleScroll}>
        <div className={styles.slider}>
          {products.map(product => (
            <div key={product.id} className={styles.card}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};