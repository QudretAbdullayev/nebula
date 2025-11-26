import styles from "../Performance.module.scss";

const XAxis = ({ activeSlide, months, barChartData }) => {
  // Calculate dynamic font size based on number of items
  const itemCount = activeSlide === 0 ? months.length : barChartData.length;
  
  // Font size decreases as items increase: 12px for 6 items, 10px for 8, 8px for 10+
  const calculateFontSize = (count) => {
    if (count <= 6) return 12;
    if (count <= 8) return 10;
    if (count <= 10) return 9;
    return 8;
  };
  
  const fontSize = calculateFontSize(itemCount);

  return (
    <div 
      className={styles.chart__container__xAxis}
      style={{ '--dynamic-font-size': `${fontSize}rem` }}
    >
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
