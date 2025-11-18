"use client";

import { useState } from "react";
import styles from "./Performance.module.scss";
import Header from "./Header/Header";
import Detail from "./Detail/Detail";

const PerformanceChart = () => {
  const [showAverage, setShowAverage] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null); // null: show all, 0/1/2: show specific bar
  const [activeSlide, setActiveSlide] = useState(0); // 0: line chart, 1: bar chart
  const [checkedItems, setCheckedItems] = useState({
    achievements: false,
    quality: false,
    workload: false,
  });

  // Bar colors - applied to all groups
  const barColors = [
    'rgba(161, 127, 231, 0.4)', // Purple - Results
    'rgba(130, 237, 233, 0.4)', // Cyan - Behaviour
    'rgba(212, 133, 230, 0.4)'  // Pink - Responsibility
  ];

  // Bar chart data - values are from 0 to 5
  const barChartData = [
    {
      month: 'Jan',
      average: 4.64,
      bars: [3.56, 3.92, 4.44]
    },
    {
      month: 'Feb',
      average: 4.71,
      bars: [4.47, 3.97, 3.58]
    },
    {
      month: 'Mar',
      average: 4.71,
      bars: [3.64, 3.47, 4.14]
    },
    {
      month: 'Apr',
      average: 4.52,
      bars: [3.50, 3.86, 4.39]
    },
    {
      month: 'May',
      average: 4.96,
      bars: [4.47, 3.78, 3.89]
    },
    {
      month: 'Jun',
      average: 4.80,
      bars: [4.47, 3.97, 3.58]
    }
  ];
  
  const barChartYLabels = [5, 4, 3, 2, 1, 0];
  const maxValue = 5; // Maximum value on Y-axis
  const chartHeight = 180; // SVG height
  
  // Line chart data - percentage values 0-100
  const resultsData = [65, 60, 85, 55, 65, 50];
  const behaviourData = [60, 65, 40, 75, 60, 85];
  const responsibilityData = [40, 60, 45, 65, 55, 60];
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const lineChartYLabels = ["100%", "80%", "60%", "40%", "20%", "0"];
  
  // Helper function to convert value (0-5) to pixel height
  const valueToHeight = (value) => {
    return (value / maxValue) * chartHeight;
  };

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
          <div 
            className={`${styles.dot} ${activeSlide === 0 ? styles.active : ''}`}
            onClick={() => setActiveSlide(0)}
          ></div>
          <div 
            className={`${styles.dot} ${activeSlide === 1 ? styles.active : ''}`}
            onClick={() => setActiveSlide(1)}
          ></div>
        </div>

        {/* Header */}
        <Header/>

        {/* Chart Area */}
        <div className={styles.chart}>
          <div className={styles.chart__container}>
            {/* Y-axis labels */}
            <div className={styles.chart__container__yAxis}>
              {(activeSlide === 0 ? lineChartYLabels : barChartYLabels).map((label, index) => (
                <div key={index} className={styles.chart__container__yAxis__item}>
                  <span className={styles.chart__container__yAxis__label}>{label}</span>
                  <div className={styles.chart__container__yAxis__gridLine}></div>
                </div>
              ))}
            </div>

            {/* Conditional Chart Rendering */}
            {activeSlide === 0 ? (
              // Line Chart SVG
              <div className={styles.chartWrapper}>
                <svg preserveAspectRatio="none">
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
                </svg>
              </div>
            ) : (
              // Bar Chart SVG
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
                        {group.bars.map((barValue, barIndex) => {
                          // Hide non-selected bars when a bar is selected
                          if (selectedBarIndex !== null && selectedBarIndex !== barIndex) {
                            return null;
                          }
                          
                          // Center the bar in the group when only one bar is showing
                          const barX = selectedBarIndex !== null 
                            ? baseGroupX + (groupWidth - barWidth) / 2  // Centered
                            : baseGroupX + barIndex * barWidth;          // Normal position
                          
                          const barHeight = valueToHeight(barValue);
                          const barY = chartHeight - barHeight;
                          const barColor = barColors[barIndex];
                          
                          return (
                            <rect
                              key={barIndex}
                              x={barX}
                              y={barY}
                              width={barWidth}
                              height={barHeight}
                              fill={isGrayedOut ? '#E0E0E0' : barColor}
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
            )}

            {/* X-axis labels */}
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
          </div>
          <Detail showAverage={showAverage} setShowAverage={setShowAverage} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;