import { useCart } from '@/hooks/useCart';
import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import { CartProduct } from '../shared/components/CartProduct/CartProduct';
import { useState } from 'react';
import { OrderModal } from '../shared/components/OrderModal/OrderModal';

export const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Кошик порожній</p>
        <Link to="/menu" className={styles.emptyLink}>Перейти до меню</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Кошик</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {cartItems.map(item => (
            <CartProduct key={item.product.id} item={item} />
          ))}
        </div>

        <div className={styles.summary}>
          <p className={styles.total}>{total} ₴</p>
          <p className={styles.count}>{totalItems} товарів</p>
          <button className={styles.orderBtn} onClick={() => setIsOrderOpen(true)}>
            Оформити замовлення
          </button>
          <button className={styles.clearBtn} onClick={clearCart}>
            Очистити кошик
          </button>

        </div>
        {isOrderOpen && <OrderModal onClose={() => setIsOrderOpen(false)} />}
      </div>
    </div>
  );
};