import React from 'react';
import styles from './ModeSelection.module.css';
import { Link } from 'react-router-dom'; // Исправлен импорт (был react-router, в App.tsx используется react-router-dom)

const ModeSelection: React.FC = () => {
  return (
    <div className={styles.modeSelection}>
      <Link className={styles.modeButton} to="/ClassicMode">
        Классический
      </Link>
      <Link className={styles.modeButton} to="/DailyMode">
        Ежедневный
      </Link>
      <Link className={styles.modeButton} to="/AIMode">
        AI
      </Link>
  </div>
  );
};

export default ModeSelection;