import { useState } from 'react';
import styles from './ProductCard.module.scss';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { isSameItem } from '@/utils/cart';
import { getOptimizedImage } from '@/utils/image';
import { useSelectedLocation } from '@/hooks/useSelectedLocation';
import { LocationsModal } from '../LocationsModal';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const [hasError, setHasError] = useState(!product.imageUrl);
  const { selectedLocation } = useSelectedLocation();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useCart();
  const { favoritesItems, addToFavorites, removeFromFavorites } = useFavorites();

  // Old saved favorites may have no "variants" field
  const availableVariants = (product.variants ?? []).filter((v) => v.available);
  const hasVariants = availableVariants.length > 0;

  // First available variant is chosen by default
  const [variantId, setVariantId] = useState<number | null>(availableVariants[0]?.id ?? null);
  const selectedVariant = availableVariants.find((v) => v.id === variantId) ?? null;

  const price = selectedVariant?.price ?? product.price;
  const cartId = { productId: product.id, variantId: selectedVariant?.id ?? null };
  const isInCart = cartItems.some((item) => isSameItem(item, cartId));
  const isInFavorites = favoritesItems.some((item) => item.id === product.id);

  function handleAddToCart() {
    if (selectedLocation === null) {
      setIsLocationModalOpen(true);
      return;
    }

    addToCart(product, selectedVariant);
  }

  return (
    <article className={styles.productCard}>
      <div className={styles.imgWrapper}>
        <img
          loading="lazy"
          decoding="async"
          className={hasError ? styles.imageCover : styles.image}
          src={
            hasError || !product.imageUrl
              ? '/images/placeholder.webp'
              : getOptimizedImage({ url: product.imageUrl, width: 600 })
          }
          alt={product.name}
          onError={() => {
            setHasError(true);
          }}
        />
      </div>

      <span className={styles.category}>{product.category}</span>
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>

      {hasVariants && (
        <select
          className={styles.variantSelect}
          value={variantId ?? ''}
          onChange={(e) => setVariantId(Number(e.target.value))}
          aria-label="Оберіть варіант"
        >
          {availableVariants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      )}

      <div className={styles.footer}>
        <span className={styles.price}>{price} ₴</span>

        <div className={styles.buttons}>
          {isInFavorites ? (
            <button className={styles.addedToFav} onClick={() => removeFromFavorites(product.id)}>
              <img src="/images/Icons/Favourites_Filled_(Heart_Like).svg" alt="в улюблених" />
            </button>
          ) : (
            <button className={styles.addToFav} onClick={() => addToFavorites(product)}>
              <img src="/images/Icons/Favourites_(Heart_Like).svg" alt="додати в улюблені" />
            </button>
          )}
          {isInCart ? (
            <button className={styles.addedToCart} onClick={() => removeFromCart(cartId)}>
              Додано ✓
            </button>
          ) : (
            <button className={styles.addToCart} onClick={handleAddToCart}>
              До кошика
            </button>
          )}
        </div>
      </div>

      {isLocationModalOpen && <LocationsModal onClose={() => setIsLocationModalOpen(false)} />}
    </article>
  );
};
