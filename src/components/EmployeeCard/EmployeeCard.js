"use client";

import { useState } from "react";
import styles from "./EmployeeCard.module.scss";
import Siesta from "@/assets/icons/Siesta";
import SafeImage from "../SafeImage/SafeImage";
import ArrowDown from "@/assets/icons/ArrowDown";

const EmployeeCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card__performer}>
        <SafeImage src="/profile.jpg" alt="Khadija Gurbanova" fill />
        <div className={styles.card__performer__icon}>
          <Siesta />
        </div>
        <div className={styles.card__performer__label}>
          TOP PERFORMER
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.info__name}>Khadija Gurbanova</h3>
        <p className={styles.info__position}>
          Head of Marketing Communication
        </p>

        <button
          className={styles.info__button}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <ArrowDown/>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
