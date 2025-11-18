import styles from "../Performance.module.scss";

const XAxis = ({ activeSlide, months, barChartData }) => {
  return (
    <div className={styles.chart__container__xAxis}>
      {activeSlide === 0 ? (
        // Line chart x-axis
        months.map((month, index) => (
          <span key={index} className={styles.chart__container__xAxis__label}>
            {month}
          </span>
        ))
      ) : (
        // Bar chart x-axis with averages
        barChartData.map((data, index) => (
          <div key={index} className={styles.chart__container__xAxis__item}>
            <span className={styles.chart__container__xAxis__label}>{data.month}</span>
            <span className={styles.chart__container__xAxis__average}>{data.average}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default XAxis;
