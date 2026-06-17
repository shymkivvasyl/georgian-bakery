import styles from './CartProduct.module.scss';
import type { CartItem } from '@/types';
import { useCart } from '@/hooks/useCart';

type Props = {
  item: CartItem;
};

export const CartProduct = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(product.id)}
      >
        ✕
      </button>

      <img
        className={styles.img}
        src={product.imageUrl || '/images/placeholder.png'}
        alt={product.name}
      />

      <p className={styles.name}>{product.name}</p>

      <div className={styles.controls}>
        <button
          className={styles.qtyBtn}
          onClick={() => changeQuantity(product.id, quantity - 1)}
        >
          −
        </button>
        <span className={styles.qty}>{quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => changeQuantity(product.id, quantity + 1)}
        >
          +
        </button>
      </div>

      <p className={styles.price}>{product.price * quantity} ₴</p>
    </div>
  );
};