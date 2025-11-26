import Lock from "@/assets/icons/Lock";
import styles from "./PerksCard.module.scss";
import Unlock from "@/assets/icons/Unlock";

const PerksCard = () => {
  const perks = [
    {
      title: "Lunch on Us",
      availability: "x2 available one month",
      status: "unlocked",
    },
    { title: "Half-day Work", availability: "Unlimited", status: "unlocked" },
    { title: "Siesta Break", availability: "x1 available", status: "inUse" },
    { title: "Short Workday", availability: "x2 available", status: "pending" },
    { title: "Siesta", availability: null, status: "locked" },
    { title: "Xschool 20% discount", availability: null, status: "locked" },
    { title: "Birthday day off", availability: null, status: "locked" },
    { title: "Extra training budget", availability: null, status: "locked" },
    { title: "Short workday", availability: null, status: "locked" },
    { title: "Xschool 20% discount", availability: null, status: "locked" },
  ];

  const renderButton = (status) => {
    switch (status) {
      case "unlocked":
        return (
          <button className={`${styles.button} ${styles.unlocked}`}>
            <div className={styles.buttonInner}>
              <Unlock />
            </div>
          </button>
        );
      case "inUse":
        return (
          <div className={`${styles.activeUse} ${styles.inUse}`}>
            <span className={styles.perkInUseText}>In use</span>
          </div>
        );
      case "pending":
        return (
          <div className={`${styles.activeUse} ${styles.pending}`}>
            <span className={styles.perkPendingText}>Pending</span>
          </div>
        );
      case "locked":
        return (
          <div className={`${styles.buttonWrapper} ${styles.locked}`}>
            <button className={styles.buttonInner}>
              <Lock />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.perks}>
      <div className={styles.perks__header}>Perks & Benefits</div>

      <div className={styles.perks__list}>
        {perks.map((perk, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              perk.availability ? styles.hasAvailability : ""
            }`}
          >
            {perk.availability ? (
              <div className={styles.item__info}>
                <span className={styles.item__info__title}>{perk.title}</span>
                <span className={styles.item__info__availability}>
                  {perk.availability}
                </span>
              </div>
            ) : (
              <span
                className={`${styles.item__text} ${
                  perk.status === "locked" ? styles.locked : ""
                }`}
              >
                {perk.title}
              </span>
            )}
            {renderButton(perk.status)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerksCard;
