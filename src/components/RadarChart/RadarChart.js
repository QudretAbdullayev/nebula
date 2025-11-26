'use client';

import { useMemo } from 'react';
import styles from './RadarChart.module.scss';

const RadarChart = ({ 
  datasets = [
    {
      id: 'current',
      data: [
        { label: 'Time Management', value: 84, change: '+0.12%' },
        { label: 'Professionalism', value: 61, change: '+0.12%' },
        { label: 'Proactiveness', value: 86, change: '+0.12%' },
        { label: 'Workload', value: 56, change: '+0.12%' },
        { label: 'Collaboration', value: 86, change: '+0.12%' },
        { label: 'Achievement', value: 66, change: '+0.12%' },
        { label: 'Compliance', value: 46, change: '+0.12%' },
        { label: 'Ownership', value: 87, change: '+0.12%' },
        { label: 'Quality of work', value: 48, change: '+0.12%' },
      ]
    },
    {
      id: 'previous',
      data: [
        { label: 'Time Management', value: 64, change: '' },
        { label: 'Professionalism', value: 84, change: '' },
        { label: 'Proactiveness', value: 42, change: '' },
        { label: 'Workload', value: 79, change: '' },
        { label: 'Collaboration', value: 43, change: '' },
        { label: 'Achievement', value: 83, change: '' },
        { label: 'Compliance', value: 59, change: '' },
        { label: 'Ownership', value: 80, change: '' },
        { label: 'Quality of work', value: 36, change: '' },
      ]
    }
  ],
  size = 323
}) => {
  const center = size / 2;
  const maxRadius = 95.54;
  const levels = 5;

  const calculatePoints = (data, radius) => {
    const angleStep = (Math.PI * 2) / data.length;
    return data.map((item, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const value = item.value / 100;
      const r = radius * value;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    });
  };

  const gridLevels = useMemo(() => {
    return [
      { r: 25.74, dashed: true },
      { r: 43.19, dashed: true },
      { r: 60.64, dashed: true },
      { r: 78.09, dashed: true },
      { r: 95.54, dashed: true }
    ];
  }, []);

  const axisLines = useMemo(() => {
    if (!datasets[0]?.data) return [];
    const angleStep = (Math.PI * 2) / datasets[0].data.length;
    return datasets[0].data.map((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      return {
        x2: center + maxRadius * Math.cos(angle),
        y2: center + maxRadius * Math.sin(angle),
      };
    });
  }, [datasets, center]);

  const labels = useMemo(() => {
    if (!datasets[0]?.data) return [];
    const angleStep = (Math.PI * 2) / datasets[0].data.length;
    const labelOffset = 140;
    
    return datasets[0].data.map((item, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = center + labelOffset * Math.cos(angle);
      const y = center + labelOffset * Math.sin(angle);
      
      return { x, y, label: item.label, change: item.change };
    });
  }, [datasets, center]);

  return (
    <div className={styles.chartContainer}>
      <svg 
        width={size} 
        height={248} 
        viewBox="0 0 323 248"
        className={styles.chartSvg}
      >
        <defs>
          <linearGradient id="currentGradient" x1="151.26" y1="44.4325" x2="151.26" y2="189.967" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A17FE7" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#A17FE7" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id="previousGradient" x1="203.848" y1="187.607" x2="103.681" y2="61.0935" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E09DDC" stopOpacity="0.2"/>
            <stop offset="1" stopColor="#E09DDC" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        
        <g transform="translate(0, 14)">
          {gridLevels.map((level, index) => (
            <circle
              key={`grid-${index}`}
              cx={center}
              cy={center}
              r={level.r}
              className={styles.gridCircle}
              strokeDasharray={level.dashed ? '6.11 6.11' : '0'}
            />
          ))}

          {axisLines.map((line, index) => (
            <line
              key={`axis-${index}`}
              x1={center}
              y1={center}
              x2={line.x2}
              y2={line.y2}
              className={styles.axisLine}
            />
          ))}

          {datasets.map((dataset, datasetIndex) => {
            const points = calculatePoints(dataset.data, maxRadius);
            
            // Create very smooth path with higher tension
            const getSmoothPath = (points) => {
              const tension = 0.5; // Increased tension for smoother curves
              let path = `M ${points[0].x} ${points[0].y}`;
              
              for (let i = 0; i < points.length; i++) {
                const p0 = points[(i - 1 + points.length) % points.length];
                const p1 = points[i];
                const p2 = points[(i + 1) % points.length];
                const p3 = points[(i + 2) % points.length];
                
                // Calculate control points with higher tension for smoother curves
                const cp1x = p1.x + (p2.x - p0.x) / 6 * tension * 2;
                const cp1y = p1.y + (p2.y - p0.y) / 6 * tension * 2;
                const cp2x = p2.x - (p3.x - p1.x) / 6 * tension * 2;
                const cp2y = p2.y - (p3.y - p1.y) / 6 * tension * 2;
                
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
              }
              
              return path + ' Z';
            };

            return (
              <g key={dataset.id}>
                <path
                  d={getSmoothPath(points)}
                  className={datasetIndex === 0 ? styles.currentPolygon : styles.previousPolygon}
                />
              </g>
            );
          })}
        </g>

        {labels.map((label, index) => (
          <g key={`label-${index}`}>
            <text
              x={label.x}
              y={label.y}
              className={styles.labelTitle}
              textAnchor="middle"
            >
              {label.label}
            </text>
            {label.change && (
              <text
                x={label.x}
                y={label.y + 14}
                className={styles.labelValue}
                textAnchor="middle"
              >
                {label.change}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default RadarChart;