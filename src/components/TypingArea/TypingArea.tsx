import React from 'react';
import styles from './TypingArea.module.css';
import { useState, useEffect } from 'react'

const TypingArea: React.FC = () => {

  const text: string = "ааддадада адададад адададада адад ададад ададададад адададада адад ададад ададададад адададада адад ададад ададададад";
  const cymbols: string[] = text.split('');
  
  const [textIndex, setTextIndex] = useState<number>(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  const [failCounter, setFailCounter] = useState<number>(0);

  // Обработчик нажатия клавиш
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {

    console.log("Нажата клавиша:", event.key);

    if (event.key == cymbols[textIndex]) {
      const newIndex = textIndex + 1;
      setTextIndex(newIndex);
      console.log("отработал")
      
      // Обновляем символы
      setNextCymbols(cymbols.slice(newIndex, newIndex + 35));
      setCompleteCymbols(cymbols.slice(0, newIndex));
      if (newIndex >= 35) {
        const start = newIndex - 34; // Начинаем за 34 символа до текущего
        const end = newIndex + 1;    // Заканчиваем на текущем символе
        setCompleteCymbols(cymbols.slice(start, end));
      }
    }
    else {
      const failSum = failCounter + 1;
      setFailCounter(failSum);
      console.log("Счетчик ошибок:" + failSum);
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
      // *ПОФИКСИТЬ ОШИБКУ!!! TS ВОСПРИНИМАЕТ НАЖАНИЕ НА SHIFT, ALT И Т.П. КАК ОШИБКУ!!!
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [textIndex, cymbols]);

  // Инициализация при первом рендере
  useEffect(() => {
    setNextCymbols(cymbols.slice(0, 35));
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