import { createPortal } from "react-dom";
import styles from "./LocationsModal.module.scss";
import { useLocations } from "@/hooks/useLocations";
import type { Locations } from "@/types/Locations";
import { Loader } from "../Loader/Loader";

type Props = {
  onClose: () => void;
};

export const LocationsModal = ({ onClose }: Props) => {
  const { locations, isLoading } = useLocations();

  // Групуємо локації по областях
  const grouped = locations.reduce((acc, loc) => {
    if (!acc[loc.region]) {
      acc[loc.region] = [];
    }

    acc[loc.region].push(loc);
    return acc;
  }, {} as Record<string, Locations[]>);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Наші локації</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.list}>
            {Object.entries(grouped).map(([region, locs]) => (
              <div key={region} className={styles.region}>
                <h3 className={styles.regionTitle}>{region} область</h3>
                {locs.map((loc, i) => (
                  <div key={i} className={styles.location}>
                    <span className={styles.city}>{loc.city}</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Грузинська випічка ' + loc.city + ', ' + loc.address)}`} target="_blank"
                      rel="noreferrer"
                      className={styles.address}
                    >
                      {loc.address}
                    </a>
                    <a href={`tel:${loc.phone}`} className={styles.phone}>
                      {loc.phone}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div >,
    document.body
  );
};