'use client';
import { useEffect, useState } from 'react';
import BackVector from '@/assets/icons/BackVector';
import styles from './Move.module.scss';
import BackVector1 from '@/assets/icons/BackVector1';

const Move = () => {
  const [vector1Pos, setVector1Pos] = useState({ x: 0, y: 70 });
  const [vector2Pos, setVector2Pos] = useState({ x: 70, y: 0 }); 
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const moveVectors = () => {
      const vector1Positions = [
        { x: 0 + Math.random() * 15, y: 65 + Math.random() * 15 }, 
        { x: 0 + Math.random() * 15, y: 0 + Math.random() * 15 }, 
        { x: 65 + Math.random() * 15, y: 0 + Math.random() * 15 },
        { x: 0 + Math.random() * 15, y: 65 + Math.random() * 15 },
        { x: 65 + Math.random() * 15, y: 0 + Math.random() * 15 },
        { x: 0 + Math.random() * 15, y: 0 + Math.random() * 15 }, 
        { x: 65 + Math.random() * 15, y: 65 + Math.random() * 15 }
      ];

      const vector2Positions = [
        { x: 65 + Math.random() * 15, y: 0 + Math.random() * 15 },
        { x: 65 + Math.random() * 15, y: 65 + Math.random() * 15 },
        { x: 0 + Math.random() * 15, y: 65 + Math.random() * 15 },
        { x: 0 + Math.random() * 15, y: 0 + Math.random() * 15 },
        { x: 0 + Math.random() * 15, y: 65 + Math.random() * 15 },
        { x: 65 + Math.random() * 15, y: 65 + Math.random() * 15 },
        { x: 65 + Math.random() * 15, y: 0 + Math.random() * 15 }
      ];

      setVector1Pos(vector1Positions[currentStep]);
      setVector2Pos(vector2Positions[currentStep]);
      setCurrentStep((prev) => (prev + 1) % 7);
    };

    const interval = setInterval(moveVectors, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentStep]);

  return (
    <div className={styles.move}>
      <BackVector
        className={styles.vector1}
        style={{
          left: `${vector1Pos.x}%`,
          top: `${vector1Pos.y}%`,
        }}
      />
      <BackVector1
        className={styles.vector2}
        style={{
          left: `${vector2Pos.x}%`,
          top: `${vector2Pos.y}%`,
        }}
      />
    </div>
  );
};

export default Move;
