import React from 'react';
import styles from './TypingArea.module.css';

const TypingArea: React.FC = () => {
  return (
    <div className={styles.typingArea}>
      <input
        type="text"
        className={styles.typingInput}
        placeholder=""
        disabled
      />
    </div>
  );
};

export default TypingArea;