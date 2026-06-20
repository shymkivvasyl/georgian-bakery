import styles from './CartProduct.module.scss';
import type { CartItem } from '@/types';
import { useCart } from '@/hooks/useCart';
import { AvailabilityModal } from '../AvailabilityModal';

type Props = {
  item: CartItem;
};

export const CartProduct = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <div className={styles.imgWrap}>
        <button
          className={styles.removeBtn}
          onClick={() => removeFromCart(product.id)}
        >
          <img src="/images/Icons/Close.svg" alt="close" />
        </button>
        <img
          className={styles.img}
          src={product.imageUrl || '/images/placeholder.png'}
          alt={product.name}
        />
      </div>

      <p className={styles.name}>{product.name}</p>
      <AvailabilityModal productId={product.id} />

      <div className={styles.controls}>
        <div className={styles.qty_controls}>
          <button className={styles.qtyBtn} onClick={() => changeQuantity(product.id, quantity - 1)}>
            <img src="/images/Icons/Minus.svg" alt="minus" />
          </button>
          <span className={styles.qty}>{quantity}</span>
          <button className={styles.qtyBtn} onClick={() => changeQuantity(product.id, quantity + 1)}>
            <img src="/images/Icons/Plus.svg" alt="" />
          </button>
        </div>
        <p className={styles.price}>{product.price} ₴</p>
      </div>
    </div>
  );
};