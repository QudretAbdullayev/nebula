"use client"
import { useState } from 'react';
import styles from './ScoreCard.module.scss';
import LowTrend from '@/assets/icons/LowTrend';
import ArrowLeft from '@/assets/icons/ArrowLeft';
import ArrowRight from '@/assets/icons/ArrowRight';

const ScoreCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <div className={styles.score}>
      <div className={styles.score__background}>
        <div className={styles.score__ellipse}></div>
        <div className={styles.score__ellipse1}></div>
      </div>

      <div className={styles.score__content}>
        <div className={styles.score__header}>
          <div className={styles.score__header__info}>
            96.23
            <div className={styles.score__header__info__icon}>
              <LowTrend/>
            </div>
          </div>
          <h3 className={styles.score__header__label}>Total Score</h3>
        </div>

        <p className={styles.score__description}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.Lorem ipsum dolor sit amet consectetur
        </p>

        <div className={styles.score__navigation}>
          <button 
            className={styles.score__navigation__previous}
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <ArrowLeft/>
          </button>

          <div className={styles.score__navigation__slider}>
            {[...Array(totalSlides)].map((_, index) => (
              <div
                key={index}
                className={`${styles.score__navigation__slider__segment} ${
                  index === currentSlide ? styles.active : ''
                }`}
              ></div>
            ))}
          </div>
          <button 
            className={styles.score__navigation__next}
            onClick={handleNext}
            aria-label="Next"
          >
            <ArrowRight/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;