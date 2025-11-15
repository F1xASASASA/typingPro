import React from 'react';
import styles from './TypingArea.module.css';

const TypingArea: React.FC = () => {
  const text:string = "текст текст текст"
    const simviols:string[] = text.split('');
    let next_simvols:string[] = [simviols[0], simviols[1], simviols[2],simviols[3]]
    let complete_simvols:string[] = []



  return (
    <div className={styles.typingArea}>
      <div className="next_simvols">{next_simvols}</div>
      <div className="complete_simvols">{complete_simvols}</div>
    </div>
  );
};

export default TypingArea;