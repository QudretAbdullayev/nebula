import styles from "./Header.module.scss";
import Calendar from "@/assets/icons/Calendar";
import FullScreen from "@/assets/icons/FullScreen";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__top__left}>
          <div className={styles.header__top__left__title}>
            Performance Overview
          </div>
          <div className={styles.header__top__left__subtitle}>
            Sub criterias
          </div>
        </div>
        <div className={styles.header__top__right}>
          <button className={styles.header__top__right__date}>
            Last six month
            <Calendar />
          </button>
          <button className={styles.header__top__right__full}>
            <FullScreen />
          </button>
        </div>
      </div>
      <div className={styles.header__bottom}>
        <div className={styles.header__bottom__item}>
          <div className={styles.header__bottom__item__value}>4.62</div>
          <div className={styles.header__bottom__item__label}>Score</div>
        </div>
        <div className={styles.header__bottom__item}>
          <div className={styles.header__bottom__item__value}>95.45%</div>
          <div className={styles.header__bottom__item__label}>Rating</div>
        </div>
        <div className={styles.header__bottom__item}>
          <div className={styles.header__bottom__item__value}>3</div>
          <div className={styles.header__bottom__item__label}>Evaluated</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
