import { useEffect, useState } from 'react';
import styles from './BannerSlider.module.scss';

const slides = [
  '/images/banner/banner-1.png',
  '/images/banner/banner-2.png',
  '/images/banner/banner-3.png',
];

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [touchStartX, setTouchStartX] = useState(0);

  const goToSlide = (index: number, dir: 'next' | 'prev' = 'next') => {
    setDirection(dir);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  };

  const getImageClass = (index: number) => {
    if (index === currentSlide) return styles.active;
    if (index === prevSlide) {
      return direction === 'next' ? styles.prevNext : styles.prevPrev;
    }
    return '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
        'next',
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div
      className={styles.bannerSlider}
      onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (diff < -50) goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1, 'prev');
        if (diff > 50) goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1, 'next');
      }}
    >
      <div className={styles.sliderContent}>
        <button
          className={styles.icon}
          onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1, 'prev')}
        >
          <img src="/images/Icons/Chevron_(Arrow_Left).svg" alt="prev" />
        </button>

        <div className={styles.images}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`banner-${index + 1}`}
              className={getImageClass(index)}
            />
          ))}
        </div>

        <button
          className={styles.icon}
          onClick={() => goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1, 'next')}
        >
          <img src="/images/Icons/Chevron_(Arrow_Right).svg" alt="next" />
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.dot_active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};