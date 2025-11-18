"use client";

import { useState } from "react";
import styles from "./Performance.module.scss";
import Header from "./Header/Header";

const PerformanceChart = () => {
  const [showAverage, setShowAverage] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null); // null: show all, 0/1/2: show specific bar
  const [checkedItems, setCheckedItems] = useState({
    achievements: false,
    quality: false,
    workload: false,
  });

  // Bar chart data
  const barChartData = [
    {
      month: 'Jan',
      average: 4.64,
      bars: [
        { height: 128, color: 'rgba(161, 127, 231, 0.4)' },
        { height: 141, color: 'rgba(130, 237, 233, 0.4)' },
        { height: 160, color: 'rgba(212, 133, 230, 0.4)' }
      ]
    },
    {
      month: 'Feb',
      average: 4.71,
      bars: [
        { height: 161, color: 'rgba(161, 127, 231, 0.4)' },
        { height: 143, color: 'rgba(130, 237, 233, 0.4)' },
        { height: 129, color: 'rgba(212, 133, 230, 0.4)' }
      ]
    },
    {
      month: 'Mar',
      average: 4.71,
      bars: [
        { height: 131, color: 'rgba(161, 127, 231, 0.4)' },
        { height: 125, color: 'rgba(130, 237, 233, 0.4)' },
        { height: 149, color: 'rgba(212, 133, 230, 0.4)' }
      ]
    },
    {
      month: 'Apr',
      average: 4.52,
      bars: [
        { height: 126, color: 'rgba(161, 127, 231, 0.4)' },
        { height: 139, color: 'rgba(130, 237, 233, 0.4)' },
        { height: 158, color: 'rgba(212, 133, 230, 0.4)' }
      ]
    },
    {
      month: 'May',
      average: 4.96,
      bars: [
        { height: 161, color: 'rgba(161, 127, 231, 0.4)' },
        { height: 136, color: 'rgba(130, 237, 233, 0.4)' },
        { height: 140, color: 'rgba(212, 133, 230, 0.4)' }
      ]
    },
    {
      month: 'Jun',
      average: 4.80,
      bars: [
        { height: 161, color: 'rgba(161, 127, 231, 0.4)' },
        { height: 143, color: 'rgba(130, 237, 233, 0.4)' },
        { height: 129, color: 'rgba(212, 133, 230, 0.4)' }
      ]
    }
  ];
  
  const barChartYLabels = [5, 4, 3, 2, 1, 0];

  // Generate smooth SVG path for a line using cubic bezier curves
  const generatePath = (data) => {
    const width = 498;
    const height = 194;
    const points = data.length;
    const xStep = width / (points - 1);

    // Convert data to coordinates
    const coords = data.map((value, i) => ({
      x: i * xStep,
      y: height - (value * height) / 100,
    }));

    // Start path
    let path = `M ${coords[0].x},${coords[0].y}`;

    // Create smooth curves
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      const next = coords[i + 1];

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
            {/* Y-axis labels for bar chart */}
            <div className={styles.chart__container__yAxis}>
              {barChartYLabels.map((label, index) => (
                <div key={index} className={styles.chart__container__yAxis__item}>
                  <span className={styles.chart__container__yAxis__label}>{label}</span>
                  <div className={styles.chart__container__yAxis__gridLine}></div>
                </div>
              ))}
            </div>

            {/* Bar Chart SVG */}
            <div className={styles.barChartWrapper}>
              <svg
                viewBox="0 0 509 180"
                preserveAspectRatio="none"
                className={styles.barChartSvg}
              >
                {barChartData.map((group, groupIndex) => {
                  const groupWidth = 42;
                  const barWidth = 14;
                  const spacing = 46.6; // Spacing between groups
                  
                  // Calculate X position: start + (groupWidth + spacing) * index
                  // Group positions: 12, 100.6, 189.2, 277.8, 366.4, 455
                  const baseGroupX = 12 + (groupWidth + spacing) * groupIndex;
                  
                  // Determine if this group should be grayed out
                  const isGrayedOut = hoveredGroup !== null && hoveredGroup !== groupIndex;

                  return (
                    <g 
                      key={groupIndex}
                      onMouseEnter={() => setHoveredGroup(groupIndex)}
                      onMouseLeave={() => setHoveredGroup(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {group.bars.map((bar, barIndex) => {
                        // Hide non-selected bars when a bar is selected
                        if (selectedBarIndex !== null && selectedBarIndex !== barIndex) {
                          return null;
                        }
                        
                        // Center the bar in the group when only one bar is showing
                        const barX = selectedBarIndex !== null 
                          ? baseGroupX + (groupWidth - barWidth) / 2  // Centered
                          : baseGroupX + barIndex * barWidth;          // Normal position
                        
                        const barY = 180 - bar.height;
                        
                        return (
                          <rect
                            key={barIndex}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={bar.height}
                            fill={isGrayedOut ? '#E0E0E0' : bar.color}
                            rx="7"
                            ry="7"
                            className={styles.barRect}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBarIndex(selectedBarIndex === barIndex ? null : barIndex);
                            }}
                            style={{
                              animationDelay: `${groupIndex * 0.1 + barIndex * 0.05}s`,
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* X-axis labels with averages */}
            <div className={styles.chart__container__xAxis}>
              {barChartData.map((data, index) => (
                <div key={index} className={styles.chart__container__xAxis__item}>
                  <span className={styles.chart__container__xAxis__label}>{data.month}</span>
                  <span className={styles.chart__container__xAxis__average}>{data.average}</span>
                </div>
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