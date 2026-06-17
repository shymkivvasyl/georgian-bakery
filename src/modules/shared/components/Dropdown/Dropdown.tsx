import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export const Dropdown = ({ options, value, onChange, label }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // закриття при кліку поза дропдауном
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = options.find(o => o.value === value)?.label;

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <span className={styles.label}>{label}</span>}
      <button
        className={`${styles.header} ${isOpen ? styles.header_open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLabel}
        <img
          src={isOpen ? '/images/Icons/Chevron_(Arrow_Up).svg' : '/images/Icons/Chevron_(Arrow_Down).svg'}
          alt=""
          className={styles.arrow}
        />
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${styles.item} ${value === option.value ? styles.item_active : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};