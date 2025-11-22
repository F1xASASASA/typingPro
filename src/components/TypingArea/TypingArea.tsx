import React from 'react';
import styles from './TypingArea.module.css';
import { useState, useEffect } from 'react'

interface TypingAreaProps {
  onFailCountChange?: (failCount: number) => void;
  onCompleteCymbols?: (pressCount: number)=> void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ onFailCountChange, onCompleteCymbols }) => {

  const text: string = "ВВсужен крутой ВВтекст чекать контекст нужен крутой текст ВВчекать контекст нужен крутой текст чекать контекст нужен крутой текст чекать контекст";
  const cymbols: string[] = text.split('');

  const [cymbolsCount, setCymbolsCount] = useState<number>(0)
  
  const [textIndex, setTextIndex] = useState<number>(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  
  let AllCountCymbols = 45;
  let keyIgnore:boolean = false

  // Подсчеты для статистики 
  const [failCount, setFailCount] = useState<number>(0);
  const [pressCount, setPresCount] = useState<number>(1)
  // const [completeCount, setCompleteCount] = useState<number>(0)

  // Статистика
  const [accuracy, setAccuracy] = useState<number>(100)

  // Оповещаем родительский компонент об изменении failCount
  useEffect(() => {
    if (onFailCountChange) {
      onFailCountChange(failCount);
    }
  }, [failCount, onFailCountChange]);

  // Обработчик нажатия клавиш
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log("Следущий символ: " + nextCymbols)
    console.log("Отработаный символ: " + completeCymbols)
    console.log("Нажата клавиша:", event.key)
    console.log("Клавишь нажато:", pressCount)


    if (
      event.key != "ContextMenu" &&
      event.key != "AltGraph" &&
      event.key != "Meta" &&
      event.key != "Control" &&
      event.key != "Alt" &&
      event.key != "Shift"
    ) {
      keyIgnore = true
    }
    else {
      keyIgnore = false
    } 
    
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
      if ( keyIgnore != false ) {
        const failSum = failCount + 1;
        setFailCount(failSum);
        console.log("Счетчик ошибок:" + failSum);
      }
    };

    if( keyIgnore != false )
    {
      setPresCount(pressCount + 1)
    }

    setAccuracy(cymbolsCount * pressCount)

    console.log(accuracy)
  }
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
export const default_FailSum = 0;