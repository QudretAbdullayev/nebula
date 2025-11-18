import styles from "./Detail.module.scss";

const Detail = ({ showAverage, setShowAverage }) => {
  return (
    <div className={styles.legendContainer}>
      <label className={styles.showAverage}>
        <input
          type="radio"
          name="showAverage"
          checked={showAverage}
          onChange={(e) => setShowAverage(e.target.checked)}
        />
        <span>Show average</span>
      </label>
      <div className={styles.legendLeft}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.results}`}></div>
          <span className={styles.legendText}>Results</span>
        </div>

        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.behaviour}`}></div>
          <span className={styles.legendText}>Behaviour</span>
        </div>

        <div className={styles.legendItem}>
          <div
            className={`${styles.legendColor} ${styles.responsibility}`}
          ></div>
          <span className={styles.legendText}>Responsibility</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
