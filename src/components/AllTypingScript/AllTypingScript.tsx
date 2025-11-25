import React, { useState, useEffect, useRef } from 'react';
import style from './AllTypingScript.module.css';
import { CounterProps } from '@vkontakte/vkui';
import RestartButton from '../RestartButton/RestartButton';

const AllTypingScript: React.FC = () => {
  const text: string =
    "ВВсужен крутой ВВтекст чекать контекст нужен крутой текст ВВчекать контекст нужен крутой текст чекать контекст нужен крутой текст чекать контекст";

  const cymbols = text.split('');

  const [textIndex, setTextIndex] = useState(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);


  // Статистика 
  const [failCount, setFailCount] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [startScript, setStartScript] = useState<boolean>(false)
  const [countPerSecond, setCountPerSecond] = useState<number>(0)
  const [allCountCymbols, setAllCountCymbols] = useState<number>(45)



  const inputRef = useRef<HTMLInputElement>(null);

    const handleReloadApp = () => {
    setTextIndex(0);
    setNextCymbols(cymbols.slice(0, allCountCymbols));
    setCompleteCymbols([]);
    setSeconds(0);

    setFailCount(0);
    setPressCount(0);
    setAccuracy(0);
    setStartScript(false);
    console.log("Ну допустим перезагрузка");
  };

  // Секундомер
    useEffect(() => {
    if (startScript === false) {
      return(console.log("Не отработало"));
    }
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds + 1;
        return newSeconds;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [startScript]);


  // Инициализация
  useEffect(() => {
    setNextCymbols(cymbols.slice(0, allCountCymbols));

    // автофокус на input
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);


  // Основная обработка ввода (Android OK)
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!value) {
      // Backspace
      return;
    }

    const char = value[value.length - 1]; // последний введённый символ
    e.currentTarget.value = ""; // очищаем input

    setPressCount(prev => prev + 1);

    if (char === cymbols[textIndex]) {
      // верная буква 
      setStartScript(true);
      const newIndex = textIndex + 1;
      setTextIndex(newIndex);

      setCompleteCymbols(cymbols.slice(Math.max(0, newIndex - allCountCymbols), newIndex));
      setNextCymbols(cymbols.slice(newIndex, newIndex + allCountCymbols));
    } 
    if (startScript == true && char !== cymbols[textIndex]) {
        setFailCount(prev => prev + 1);
    }

    setAccuracy((textIndex / (pressCount + 1)) * 100);
  }

return (
    <div className="">
      <div className={style.typingAreaWrapper} onClick={() => inputRef.current?.focus()}>
        <input
          ref={inputRef}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className={style.hiddenInput}
          onInput={handleInput}/>

        <div className={style.typingAreaMain}>
          <div className={style.completeCymbols}>{completeCymbols}</div>
          <div className={style.cutterCymbols}> </div>
          <div className={style.nextCymbols}>{nextCymbols}</div>
        </div>
      </div>
      <div className={style.statsDisplayWrapper}>
        <div className={style.statsDisplayMain}>
            <div className="">Ошибки: {failCount}</div>
            <div className="">Общее время: {seconds}</div>
            <div className="">Точность: {Math.trunc(accuracy)} %</div>
            <div className="">Cимв/сек: {countPerSecond}</div>
        </div>
      </div>
      
      <div className=''>
        <RestartButton onButtonClick={handleReloadApp} />
      </div>
    </div>
    
  );
};

export default AllTypingScript;