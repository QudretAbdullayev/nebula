import styles from "./KudosCard.module.scss";
import SafeImage from "../SafeImage/SafeImage";

const KudosCard = () => {
  return (
    <div className={styles.kudos}>
      <div className={styles.header}>
        <h2 className={styles.header__title}>Kudos</h2>
        <button className={styles.header__button}>More</button>
      </div>

      <div className={styles.content}>
        <div className={styles.content__image}></div>

        <p className={styles.content__text}>
          "The way you coordinated with both the design and development teams
          kept everything on track and ensured deadlines were met🚀🔥"
        </p>

        <div className={styles.content__author}>
          <div className={styles.content__author__avatar}>
            <SafeImage
              src="/Dashboard/kudos-profile.jpg"
              alt="Omar Saris"
              fill
            />
          </div>

          <div className={styles.content__author__info}>
            <span className={styles.content__author__info__name}>Omar Saris</span>
            <span className={styles.content__author__info__time}>2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KudosCard;
