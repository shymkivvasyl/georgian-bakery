import { useState } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import { useCart } from '@/hooks/useCart';
import { useLocations } from '@/hooks/UseLocations';
import { Dropdown } from '../Dropdown';
import styles from './OrderModal.module.scss';

type Props = {
  onClose: () => void;
};

export const OrderModal = ({ onClose }: Props) => {
  const { cartItems, clearCart } = useCart();
  const { locations } = useLocations();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+38');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(2);
    if (digits.length === 0) return '+38';

    let result = '+38 (';
    result += digits.slice(0, 3);
    if (digits.length > 3) result += ') ' + digits.slice(3, 6);
    if (digits.length > 6) result += ' ' + digits.slice(6, 8);
    if (digits.length > 8) result += ' ' + digits.slice(8, 10);
    return result;
  };

  const locationOptions = locations.map(loc => ({
    value: `${loc.city} — ${loc.address}`,
    label: `${loc.city} — ${loc.address}`,
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  const orderItems = cartItems
    .map(item => `${item.product.name} x${item.quantity} — ${item.product.price * item.quantity}₴`)
    .join('\n');

  const handleSubmit = async () => {
    if (!name || !phone || !location) {
      setError('Заповніть всі обов\'язкові поля');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          customer_name: name,
          customer_phone: phone,
          location,
          order_items: orderItems,
          total,
          comment,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setIsSent(true);
      clearCart();
    } catch {
      setError('Помилка відправки. Спробуйте ще раз.');
    } finally {
      setIsSending(false);
    }
  };


  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>

        {isSent ? (
          <div className={styles.success}>
            <h2 className={styles.title}>Замовлення прийнято! 🎉</h2>
            <p className={styles.successText}>Ми зв'яжемось з вами найближчим часом.</p>
            <button className={styles.closeBtn} onClick={onClose}>Закрити</button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Оформлення замовлення</h2>

            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Ім'я *</label>
                <input
                  className={styles.input}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ваше ім'я"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Телефон *</label>
                <input
                  className={styles.input}
                  value={phone}
                  onChange={e => {
                    const val = e.target.value;
                    if (!val.startsWith('+38')) return;
                    setPhone(formatPhone(val));
                  }}
                  placeholder="+38 (0__) ___ __ __"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Локація самовивозу *</label>
                <Dropdown
                  options={locationOptions}
                  value={location}
                  onChange={setLocation}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Коментар</label>
                <textarea
                  className={styles.textarea}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Побажання до замовлення..."
                  rows={3}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.summary}>
                <span className={styles.total}>Сума: {total} ₴</span>
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={isSending}
                >
                  {isSending ? 'Відправляємо...' : 'Підтвердити замовлення'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};