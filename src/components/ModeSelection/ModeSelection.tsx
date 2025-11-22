import React from 'react';
import styles from './ModeSelection.module.css';
import { Link } from 'react-router';

const ModeSelection: React.FC = () => {
  return (
    <div className={styles.modeSelection}>
      <Link className={styles.modeButton} to="/ClassicMode">
        Классический
      </Link>
      <Link className={styles.modeButton} to="/DailyMode">
        Ежедневный
      </Link>
      <Link className={styles.modeButton} to="/InfinityMode">
        Бесконечный
      </Link>
  </div>
  );
};

export default ModeSelection;