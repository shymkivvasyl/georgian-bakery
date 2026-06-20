import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocations } from '@/hooks/useLocations';
import styles from './AvailabilityModal.module.scss';
import { Loader } from '../Loader/Loader';

type Props = {
  productId: number;
};

export const AvailabilityModal = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { locations, isLoading } = useLocations();

  const availableLocations = locations.filter(loc =>
    loc.availableProducts.includes(productId)
  );

  return (
    <>
      <button
        className={styles.availabilityBtn}
        onClick={() => setIsOpen(true)}
      >
        {isLoading ? 'Наявність...' : `Наявність (${availableLocations.length})`}
      </button>

      {isOpen && createPortal(
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setIsOpen(false)}>✕</button>
            <h2 className={styles.title}>Наявність товару {availableLocations.length}</h2>
            {isLoading ? (
              <Loader />
            ) : availableLocations.length === 0 ? (
              <p className={styles.empty}>Немає в наявності</p>
            ) : (
              <ul className={styles.list}>
                {availableLocations.map(loc => (
                  <li key={loc.id} className={styles.item}>
                    {loc.city} — {loc.address}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};