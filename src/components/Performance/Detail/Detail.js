import styles from "./Detail.module.scss";

const Detail = ({ showAverage, setShowAverage, checkedItems, setCheckedItems }) => {
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

        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={checkedItems.achievements}
              onChange={(e) =>
                setCheckedItems({
                  ...checkedItems,
                  achievements: e.target.checked,
                })
              }
            />
            <span>Achievements</span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={checkedItems.quality}
              onChange={(e) =>
                setCheckedItems({
                  ...checkedItems,
                  quality: e.target.checked,
                })
              }
            />
            <span>Quality of work</span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={checkedItems.workload}
              onChange={(e) =>
                setCheckedItems({
                  ...checkedItems,
                  workload: e.target.checked,
                })
              }
            />
            <span>Workload</span>
          </label>
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
