import React, { useState, useEffect, useRef } from 'react';
import style from './AllTypingScript.module.css';
import RestartButton from '../RestartButton/RestartButton';

interface Props {
  text?: string
  reloadText: () => void;
}




const AllTypingScript: React.FC<Props> = ({ text, reloadText}) => {
  const [comfirmText, setComfirmText] = useState("");

  
  useEffect(() => {
      if (text) {
        setComfirmText(text);
      }
    }, [text]);

// 2. Когда изменился comfirmText — обновляем отображение и ставим фокус
useEffect(() => {
  if (comfirmText.length === 0) return;

  setNextCymbols(comfirmText.split('').slice(0, allCountCymbols));

  // автофокус
  setTimeout(() => inputRef.current?.focus(), 200);
}, [comfirmText]);

  const cymbols = comfirmText.split('');


  const [textIndex, setTextIndex] = useState(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);


  // Статистика 
  const [failCount, setFailCount] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [startScript, setStartScript] = useState<boolean>(false)
  const [allCountCymbols, setAllCountCymbols] = useState<number>(45)


  //Перезагрузка

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
      reloadText(); // ← вот это вызывает новый текст
      setTimeout(() => inputRef.current?.focus(), 200);
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



    if (text !== undefined) setComfirmText(text);
       console.log(text)

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
    <div className={style.allTypingScriptMain}>
      <div className={style.typingScriptInput} onClick={() => inputRef.current?.focus()}>
        <input
          ref={inputRef}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className={style.hiddenInput}
          onInput={handleInput}/>

        <div className={style.typingScriptMain}>
          <div className={style.completeCymbols}>{completeCymbols}</div>
          <div className={style.cutterCymbols}> </div>
          <div className={style.nextCymbols}>{nextCymbols}</div>
        </div>
      </div>

      <div className={style.statsDisplayWrapper}>
        <div className={style.statsDisplayMain}>
            <div>Ошибки: {failCount}</div>
            <div>Общее время: {seconds}</div>
            <div>Точность: {Math.trunc(accuracy)} %</div>
        </div>
      </div>
      
      <RestartButton onButtonClick={handleReloadApp}/>
    </div>
  );
};

export default AllTypingScript;