import React from 'react';
import styles from './StartButton.module.css';

const StartButton: React.FC = () => {
  return (
    <button className={styles.startButton} disabled>Начать сначала</button>
  );
};

export default StartButton;