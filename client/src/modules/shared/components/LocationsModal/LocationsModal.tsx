import { createPortal } from "react-dom";
import styles from "./LocationsModal.module.scss";
import type { Locations } from "@/types/Locations";
import { Loader } from "../Loader/Loader";
import { useLocationsContext } from "@/hooks/useLocationsContext";
import { useEffect, useState } from "react";
import { searchLocations } from "@/utils/locations";
import { useSelectedLocation } from "@/hooks/useSelectedLocation";

type Props = {
  onClose: () => void;
};

export const LocationsModal = ({ onClose }: Props) => {
  const { locations, isLoading } = useLocationsContext();
  const { selectedLocation, setSelectedLocation } = useSelectedLocation();

  const handleSelect = (id: number) => {
    setSelectedLocation(id);
    onClose();
  };

  const [search, setSearch] = useState('');
  const filteredLocations = searchLocations(locations, search);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);


  const grouped = filteredLocations.reduce((acc, loc) => {
    if (!acc[loc.region]) {
      acc[loc.region] = [];
    }

    acc[loc.region].push(loc);
    return acc;
  }, {} as Record<string, Locations[]>);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Закрити">✕</button>
        <h2 className={styles.title}>Наші локації</h2>
        <p className={styles.subtitle}>Оберіть точку, щоб бачити лише доступні страви</p>

        <input
          className={styles.search}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          placeholder="Місто або вулиця..."
          aria-label="Пошук закладу"
        />

        {isLoading ? (
          <Loader />
        ) : filteredLocations.length === 0 ? (
          <p className={styles.empty}>Нічого не знайдено</p>
        ) : (
          <div className={styles.list}>
            {Object.entries(grouped).map(([region, locs]) => (
              <div key={region} className={styles.region}>
                <h3 className={styles.regionTitle}>{region} область</h3>
                {locs.map(loc => {

                  // true only for the location the user selected before
                  const isSelected = loc.id === selectedLocation;

                  return (
                    <div
                      key={loc.id}
                      className={`${styles.location} ${isSelected ? styles.location_selected : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelect(loc.id)}
                    >
                      <div className={styles.locationHeader}>
                        <span className={styles.city}>{loc.city}</span>
                        {isSelected && <span className={styles.selectedBadge}>✓ Обрано</span>}
                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Грузинська випічка ' + loc.city + ', ' + loc.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.address}
                        onClick={e => e.stopPropagation()}                      >
                        {loc.address}
                      </a>

                      {loc.phone && (
                        <a
                          href={`tel:${loc.phone}`}
                          className={styles.phone}
                          onClick={e => e.stopPropagation()}                        >
                          {loc.phone}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
