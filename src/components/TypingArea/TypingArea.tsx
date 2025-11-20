import React from 'react';
import styles from './TypingArea.module.css';
import { useState, useEffect } from 'react'


const TypingArea: React.FC = () => {

  const text: string = "ВВсужен крутой ВВтекст чекать контекст нужен крутой текст ВВчекать контекст нужен крутой текст чекать контекст нужен крутой текст чекать контекст";
  const cymbols: string[] = text.split('');

  const [cymbolsCount, setCymbolsCount] = useState<number>(0)
  
  const [textIndex, setTextIndex] = useState<number>(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  const [failCounter, setFailCounter] = useState<number>(0);
  let AllCountCymbols = 45;


  // Обработчик нажатия клавиш
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log("Следущий символ: " + nextCymbols)
    console.log("Отработаный символ: " + completeCymbols)
    console.log("Нажата клавиша:", event.key);
    
    if (event.key == cymbols[textIndex]) {
      const newIndex = textIndex + 1;
      setCymbolsCount(cymbolsCount + 1)

      setTextIndex(newIndex);
      console.log("отработал")
    
      // Обновляем символы
      setNextCymbols(cymbols.slice(newIndex, newIndex + AllCountCymbols));
      setCompleteCymbols(cymbols.slice(0, newIndex));
      if (newIndex >= AllCountCymbols) {
        const start = newIndex - AllCountCymbols; // Начинаем за 34 символа до текущего
        const end = newIndex;    // Заканчиваем на текущем символе
        setCompleteCymbols(cymbols.slice(start, end));
      }
    }
    else {
      if (
        event.key != "Shift" && 
        event.key != "Alt" && 
        event.key != "Control" &&
        event.key != "Meta" &&
        event.key != "AltGraph" &&
        event.key != "ContextMenu"
      ) {
        const failSum = failCounter + 1;
        setFailCounter(failSum);
        console.log("Счетчик ошибок:" + failSum);
      }
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [textIndex, cymbols]);

  // Инициализация при первом рендере
  useEffect(() => {
    setNextCymbols(cymbols.slice(0, AllCountCymbols));
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