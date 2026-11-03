import { useCart } from '@/hooks/useCart';
import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import { CartProduct } from '../shared/components/CartProduct/CartProduct';
import { useState } from 'react';
import { OrderModal } from '../shared/components/OrderModal/OrderModal';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { getItemKey, getItemPrice } from '@/utils/cart';
import { PageMeta } from '../shared/components/PageMeta/PageMeta.tsx';

export const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0 && !isOrderOpen) {
    return (
      <>
        <PageMeta title="Кошик" description="Ваш кошик замовлення." path="/cart" noindex />
        <ErrorMessage message="Кошик порожній" />
        <div className={styles.empty}>
          <Link to="/menu" className={styles.emptyLink}>
            Перейти до меню
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styles.page}>
      <PageMeta title="Кошик" description="Ваш кошик замовлення." path="/cart" noindex />
      <h1 className={styles.title}>Кошик</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartProduct key={getItemKey(item)} item={item} />
          ))}
        </div>

        <div className={styles.summary}>
          <p className={styles.total}>{total} ₴</p>
          <p className={styles.count}>{totalItems} товарів</p>
          <button className={styles.orderBtn} onClick={() => setIsOrderOpen(true)}>
            Замовити
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
