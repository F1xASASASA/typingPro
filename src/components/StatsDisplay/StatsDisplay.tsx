import React from 'react';
import styles from './StatsDisplay.module.css';

const StatsDisplay: React.FC = () => {
  return (
    <div className={styles.statsDisplay}>
      <div className={styles.statItem}>
        Время : <input type="text" placeholder="" disabled /> S
      </div>
      <div className={styles.statItem}>
        WPM (скорость) : <input type="text" placeholder="" disabled />
      </div>
      <div className={styles.statItem}>
        Точность : <input type="text" placeholder="" disabled />%
      </div>
    </div>
  );
};

export default StatsDisplay;