import React from 'react';
import styles from './TypingArea.module.css';
import { useState, useEffect } from 'react'

const TypingArea: React.FC = () => {

  const text: string = "О-о, резиновые сапоги. О-о-о, лесочек. О-о. О-о, опушечка. О-о-о, подосиновичек. О-о-о, рыжик. О-о-о, опёнок";
  const cymbols: string[] = text.split('');
  
  const [textIndex, setTextIndex] = useState<number>(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);

  // Обработчик нажатия клавиш
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {

    console.log("Нажата клавиша:", event.key); // <-- ВОТ ЭТО

    if (event.key == cymbols[textIndex]) {
      const newIndex = textIndex + 1;
      setTextIndex(newIndex);
      console.log("отработал")
      
      // Обновляем символы
      setNextCymbols(cymbols.slice(newIndex, newIndex + 39));
      setCompleteCymbols(cymbols.slice(0, newIndex));
      // if (newIndex >= 39) {
      //   setCompleteCymbols(cymbols.splice(0, 1))
      // }
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [textIndex, cymbols]);

  // Инициализация при первом рендере
  useEffect(() => {
    setNextCymbols(cymbols.slice(0, 39));
    setCompleteCymbols([]);
  }, []);

  return (
    <div className={styles.typingArea}>
      <div className={styles.complete_cymbols}>
        {completeCymbols}
      </div>
      <div className={styles.next_cymbols}>
        {nextCymbols}
      </div>
    </div>
  )
}

export default TypingArea;