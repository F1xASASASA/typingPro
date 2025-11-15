import React from 'react';
import styles from './ModeSelection.module.css';

const ModeSelection: React.FC = () => {
  return (
    <div className={styles.modeSelection}>
      <button className={styles.modeButton} disabled>максимум слов</button>
      <div className={styles.currentMode}>Классический режим</div>
      <button className={styles.modeButton} disabled>бесконечность</button>
    </div>
  );
};

export default ModeSelection;