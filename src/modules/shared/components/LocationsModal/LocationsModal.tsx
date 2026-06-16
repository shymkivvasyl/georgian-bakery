import { createPortal } from "react-dom";
import styles from "./LocationsModal.module.scss";
import { useEffect, useState } from "react";
import { getLocations } from "@/utils";
import type { Locations } from "@/types/Locations";

type Props = {
  onClose: () => void;
};

export const LocationsModal = ({ onClose }: Props) => {
  const [locations, setLocations] = useState<Locations[]>([]);

  useEffect(() => {
    getLocations().then(data => setLocations(data));
  }, []);

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

        <div className={styles.list}>
          {Object.entries(grouped).map(([region, locs]) => (
            <div key={region} className={styles.region}>
              <h3 className={styles.regionTitle}>{region} область</h3>
              {locs.map((loc, i) => (
                <div key={i} className={styles.location}>
                  <span className={styles.city}>{loc.city}</span>
                  <span className={styles.address}>{loc.address}</span>
                  <a href={`tel:${loc.phone}`} className={styles.phone}>
                    {loc.phone}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};