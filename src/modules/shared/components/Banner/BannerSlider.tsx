import { useEffect, useState } from 'react';
import styles from './BannerSlider.module.scss';
import { Link } from 'react-router-dom';

const slides = [
  {
    img: '/images/banner/banner-1.png',
    title: 'Свіжа випічка щодня',
    subtitle: ['Хачапурі, піца, слойки —', 'прямо з печі'],
    btn: { label: 'До меню', link: '/menu' },
  },
  {
    img: '/images/banner/banner-2.png',
    title: 'Наша солодка вітрина',
    subtitle: ['Наші солодкі випічки —', 'для вашого настрою'],
    btn: { label: 'Солодке', link: '/menu?group=солодке' },
  },
  {
    img: '/images/banner/banner-3.png',
    title: 'Скоро в Glovo ',
    subtitle: ['Доставка вже на підході —', 'слідкуйте за новинами'],
    btn: { label: 'Бета', link: '#' },
  },
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
        <div className={styles.images}>
          {slides.map((slide, index) => (
            <div key={index} className={`${styles.slide} ${getImageClass(index)}`}>
              <img
                src={slide.img}
                alt={`banner-${index + 1}`}
                onError={e => {
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
              <div className={styles.overlay}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                <p className={styles.slideSubtitle}>
                  {slide.subtitle.map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
                <Link to={slide.btn.link} className={styles.slideBtn}>
                  {slide.btn.label}
                </Link>
              </div>
            </div>
          ))}
        </div>

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