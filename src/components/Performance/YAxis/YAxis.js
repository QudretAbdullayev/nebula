import styles from "../Performance.module.scss";

const YAxis = ({ activeSlide, lineChartYLabels, barChartYLabels }) => {
  return (
    <div className={styles.chart__container__yAxis}>
      {(activeSlide === 0 ? lineChartYLabels : barChartYLabels).map((label, index) => (
        <div key={index} className={styles.chart__container__yAxis__item}>
          <span className={styles.chart__container__yAxis__label}>{label}</span>
          <div className={styles.chart__container__yAxis__gridLine}></div>
        </div>
      ))}
    </div>
  );
};

export default YAxis;
