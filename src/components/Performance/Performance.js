"use client";

import { useState } from "react";
import styles from "./Performance.module.scss";
import Header from "./Header/Header";

const PerformanceChart = () => {
  const [showAverage, setShowAverage] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    achievements: false,
    quality: false,
    workload: false,
  });

  // Data points for the chart lines (6 months) - matching the design
  const resultsData = [65, 60, 85, 55, 65, 50];
  const behaviourData = [60, 65, 40, 75, 60, 85];
  const responsibilityData = [40, 60, 45, 65, 55, 60];
  const responsibilityData2 = [90, 90, 95, 95, 85, 80];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const yAxisLabels = ["100%", "80%", "60%", "40%", "20%", "0"];

  // Generate smooth SVG path for a line using cubic bezier curves
  const generatePath = (data) => {
    const width = 498;
    const height = 194;
    const points = data.length;
    
    // Calculate positions to match x-axis labels (space-between behavior)
    // First point at 0, last point at width, others evenly distributed
    const xPositions = data.map((_, i) => {
      if (i === 0) return 0;
      if (i === points - 1) return width;
      return (width / (points - 1)) * i;
    });

    // Convert data to coordinates
    const coords = data.map((value, i) => ({
      x: xPositions[i],
      y: height - (value * height) / 100,
    }));

    // Start path
    let path = `M ${coords[0].x},${coords[0].y}`;

    // Create smooth curves
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];

      // Calculate control points for smooth curves
      const cp1x = prev.x + (curr.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) / 2;
      const cp2y = curr.y;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }

    return path;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Slider dots */}
        <div className={styles.sliderButtons}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={`${styles.dot} ${styles.active}`}></div>
        </div>

        {/* Header */}
        <Header/>

        {/* Chart Area */}
        <div className={styles.chart}>
          <div className={styles.chart__container}>
            {/* Y-axis labels */}
            <div className={styles.chart__container__yAxis}>
              {yAxisLabels.map((label, index) => (
                <div key={index} className={styles.chart__container__yAxis__item}>
                  <span className={styles.chart__container__yAxis__label}>{label}</span>
                  <div className={styles.chart__container__yAxis__gridLine}></div>
                </div>
              ))}
            </div>

            {/* Chart SVG */}
            <div className={styles.chartWrapper}>
              <svg
                preserveAspectRatio="none"
              >
                {/* Results line - Purple */}
                <path
                  d={generatePath(resultsData)}
                  className={styles.lineResults}
                  fill="none"
                />
                {/* Behaviour line - Cyan */}
                <path
                  d={generatePath(behaviourData)}
                  className={styles.lineBehaviour}
                  fill="none"
                />
                {/* Responsibility line - Pink */}
                <path
                  d={generatePath(responsibilityData)}
                  className={styles.lineResponsibility}
                  fill="none"
                />
                {/* Responsibility line - Pink */}
                {/* <path
                  d={generatePath(responsibilityData2)}
                  className={styles.lineResponsibility}
                  fill="none"
                /> */}
              </svg>
            </div>

            {/* X-axis labels */}
            <div className={styles.chart__container__xAxis}>
              {months.map((month, index) => (
                <span key={index} className={styles.chart__container__xAxis__label}>
                  {month}
                </span>
              ))}
            </div>
          </div>
          {/* Legend */}
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
                <div
                  className={`${styles.legendColor} ${styles.results}`}
                ></div>
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
                <div
                  className={`${styles.legendColor} ${styles.behaviour}`}
                ></div>
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
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
