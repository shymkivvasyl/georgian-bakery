import { useContext } from 'react';
import styles from './ProductCard.module.scss';
import type { Product } from '@/types';
import { CartContext } from '@/context/CartContext';
import { FavoritesContext } from '@/context/FavoritesContext';
import { AvailabilityModal } from '../AvailabilityModal';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {

  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  if (!cartContext || !favoritesContext) return null;

  const { cartItems, addToCart, removeFromCart } = cartContext;
  const { favoritesItems, addToFavorites, removeFromFavorites } = favoritesContext;


  const isInCart = cartItems.some(item => item.product.id === product.id);
  const isInFavorites = favoritesItems.some(item => item.id === product.id);

  return (
    <article className={styles.productCard}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.image}
          src={product.imageUrl || '/images/placeholder.png'}
          alt={product.name}
        />
      </div>

      <span className={styles.category}>{product.category}</span>
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>

      <AvailabilityModal productId={product.id} />
      

      <div className={styles.footer}>
        <span className={styles.price}>{product.price} ₴</span>

        <div className={styles.buttons}>


          {isInFavorites ? (
            <button
              className={styles.addedToFav}
              onClick={() => removeFromFavorites(product.id)}
            >
              <img src="images/Icons/Favourites_Filled_(Heart_Like).svg" alt="в улюблених" />
            </button>
          ) : (
            <button
              className={styles.addToFav}
              onClick={() => addToFavorites(product)}
            >
              <img src="/images/Icons/Favourites_(Heart_Like).svg" alt="додати в улюблені" />
            </button>
          )}
          {isInCart ? (
            <button
              className={styles.addedToCart}
              onClick={() => removeFromCart(product.id)}
            >
              Додано ✓
            </button>
          ) : (
            <button
              className={styles.addToCart}
              onClick={() => addToCart(product)}
            >
              До кошика
            </button>
          )}
        </div>
      </div>
    </article>
  );
};