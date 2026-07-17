import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './CategoryCard.module.scss';

type Category = {
  label: string;
  group: string;
  img: string;
};

type Props = {
  cat: Category;
};

export const CategoryCard = ({ cat }: Props) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Link to={`/menu?group=${cat.group}`} className={styles.categoryCard}>
      <img
        src={cat.img}
        alt={cat.label}
        className={hasError ? styles.categoryImgCover : styles.categoryImg}
        onError={e => {
          e.currentTarget.src = '/images/placeholder.webp ';
          setHasError(true);
        }}
      />
      <span className={styles.categoryLabel}>{cat.label}</span>
    </Link>
  );
};