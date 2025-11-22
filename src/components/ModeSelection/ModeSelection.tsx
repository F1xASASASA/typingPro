import React from 'react';
import styles from './ModeSelection.module.css';
import {Link } from 'react-router';

const ModeSelection: React.FC = () => {
  return (
    <div className={styles.modeSelection}>
      <Link className={styles.modeButton} to="/ClassicMode">
        Ссылка на Классический
      </Link>
      <Link className={styles.modeButton} to="/DailyMode">
        Ссылка на Ежедневный
      </Link>
      <Link className={styles.modeButton} to="/InfinityMode">
        Ссылка на Бесконечный
      </Link>
  </div>
  );
};

export default ModeSelection;


    // <div className={styles.modeSelection}>
    //   <button className={styles.modeButton}>максимум слов</button>
    //   <div className={styles.currentMode}>Классический режим</div>
    //   <button className={styles.modeButton} >бесконечность</button>
    // </div>