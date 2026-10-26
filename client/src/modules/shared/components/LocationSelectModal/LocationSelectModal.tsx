import { createPortal } from 'react-dom';
import { useLocationsContext } from '@/hooks/useLocationsContext';
import { useSelectedLocation } from '@/hooks/useSelectedLocation';
import styles from './LocationSelectModal.module.scss';
import { Loader } from '../Loader/Loader';

type Props = {
  onClose: () => void;
};

export const LocationSelectModal = ({ onClose }: Props) => {
const { locations, isLoading } = useLocationsContext();
  const { setSelectedLocation } = useSelectedLocation();

  const handleSelect = (id: number) => {
    setSelectedLocation(id);
    onClose();
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <img src="/images/Icons/Close.svg" alt="close" />
        </button>
        <h2 className={styles.title}>Оберіть вашу точку</h2>
        <p className={styles.subtitle}>Щоб бачити лише доступні страви</p>

        {isLoading ? (
          <Loader/>
        ) : (
          <ul className={styles.list}>
            {locations.map(loc => (
              <li
                key={loc.id}
                className={styles.item}
                onClick={() => handleSelect(loc.id)}
              >
                {loc.city} — {loc.address}
              </li>
            ))}
          </ul>
        )}

        <button className={styles.skipBtn} onClick={onClose}>
          Пропустити
        </button>
      </div>
    </div>,
    document.body
  );
};