import SafeLink from "@/components/SafeLink/SafeLink";
import styles from "./Header.module.scss";
import SafeImage from "@/components/SafeImage/SafeImage";
import Setting from "@/assets/icons/Settings";
import Notification from "@/assets/icons/Notification";
import Settings from "@/assets/icons/Settings";

const Header = () => {
  return (
    <header className={`g-container ${styles.header}`}>
      <nav className={styles.nav}>
        <SafeLink href="/" className={styles.nav__logo}>
            <SafeImage src="/Nebula.svg" alt="Nebula" fill/>
        </SafeLink>
        <ul className={styles.nav__links}>
          <li className={styles.nav__item}>
            <SafeLink href="/dashboard">Dashboard</SafeLink>
          </li>
          <li className={styles.nav__item}>
            <SafeLink href="/feed">Feed</SafeLink>
          </li>
          <li className={styles.nav__item}>
            <SafeLink href="/employees">Employees</SafeLink>
          </li>
          <li className={styles.nav__item}>
            <SafeLink href="/blog">Blog</SafeLink>
          </li>
          <li className={styles.nav__item}>
            <SafeLink href="/setting">Setting</SafeLink>
          </li>
          <li className={styles.nav__item}>
            <Notification/>
          </li>
          <li className={styles.nav__item}>
            <Settings/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
