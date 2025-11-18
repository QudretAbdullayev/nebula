import React from 'react';
import styles from './Heatmap.module.scss';

const Heatmap = () => {
  const data = [
    {
      day: 'Monday',
      values: [16, 2, 4, 9, 9, 7, 9, 7, 12, 9, 9]
    },
    {
      day: 'Tuesday',
      values: [9, 4, 18, 2, 2, 2, 2, 0, 2, 2, 2]
    },
    {
      day: 'Wednesday',
      values: [4, 16, 2, 9, 9, 9, 9, 2, 0, 2, 1]
    },
    {
      day: 'Thursday',
      values: [2, 4, 9, 16, 3, 16, 16, 1, 1, 0, 1]
    },
    {
      day: 'Friday',
      values: [2, 16, 4, 7, 4, 4, 7, 9, 9, 0, 0]
    }
  ];

  const timeSlots = [
    '09:00 - 09:15',
    '09:15 - 09:30',
    '09:30 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
  ];

  const getIntensityClass = (value) => {
    if (value === 0) return styles.intensity0;
    if (value >= 1 && value <= 2) return styles.intensity1;
    if (value >= 3 && value <= 4) return styles.intensity2;
    if (value >= 5 && value <= 9) return styles.intensity3;
    if (value >= 10) return styles.intensity4;
    return styles.intensity0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.heatmapWrapper}>
        <div className={styles.grid}>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              <div className={styles.dayLabel}>{row.day}</div>
              <div className={styles.cells}>
                {row.values.map((value, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`${styles.cell} ${getIntensityClass(value)}`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.timeLabels}>
          {timeSlots.map((slot, index) => (
            <div key={index} className={styles.timeLabel}>
              {slot}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heatmap;