import { useState } from 'react';
import styles from './CartProduct.module.scss';
import type { CartItem } from '@/types';
import { useCart } from '@/hooks/useCart';
import { getItemPrice } from '@/utils/cart';
import { getOptimizedImage } from '@/utils/image.ts';

type Props = {
  item: CartItem;
};

export const CartProduct = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, variant, quantity } = item;
  const id = { productId: product.id, variantId: variant?.id ?? null };
  const [hasError, setHasError] = useState(!product.imageUrl);
  const price = getItemPrice(item);

  return (
    <article className={styles.item}>
      <div className={styles.imgWrap}>
        <img
          loading="lazy"
          decoding="async"
          className={styles.img}
          src={
            hasError || !product.imageUrl
              ? '/images/placeholder.webp'
              : getOptimizedImage({ url: product.imageUrl, width: 300 })
          }
          alt={product.name}
          onError={() => setHasError(true)}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        {/* Variant on its own line, like "Ассам" */}
        {variant && <p className={styles.variant}>{variant.name}</p>}
        <p className={styles.unitPrice}>{price} ₴ / шт</p>
      </div>

      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => removeFromCart(id)}
        aria-label="Видалити з кошика"
      >
        <img src="/images/Icons/Close.svg" alt="" />
      </button>

      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => changeQuantity(id, quantity - 1)}
          aria-label="Менше"
        >
          <img src="/images/Icons/Minus.svg" alt="" />
        </button>
        <span className={styles.qty}>{quantity}</span>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => changeQuantity(id, quantity + 1)}
          aria-label="Більше"
        >
          <img src="/images/Icons/Plus.svg" alt="" />
        </button>
      </div>

      <p className={styles.total}>{price * quantity} ₴</p>
    </article>
  );
};
