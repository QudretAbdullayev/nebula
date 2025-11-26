import Compare from "@/assets/icons/Compare";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__top__left}>
          <div className={styles.header__top__left__title}>
            Comparison
          </div>
          <div className={styles.header__top__left__subtitle}>
            competency overview
          </div>
        </div>
        <div className={styles.header__top__right}>
          <button className={styles.header__top__right__full}>
            <Compare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
