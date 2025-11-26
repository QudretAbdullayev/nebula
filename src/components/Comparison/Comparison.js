"use client";

import { useState } from "react";
import styles from "./Comparison.module.scss";
import Header from "./Header/Header";
import RadarChart from "../RadarChart/RadarChart";

const Comparison = () => {
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



  return (
    <div className={styles.container}>
      <div className={styles.card}>
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
        <Header/>
        <div className={styles.content}>
            <RadarChart
            />
        </div>
      </div>
    </div>
  );
};

export default Comparison;