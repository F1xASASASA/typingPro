import React, { useState, useEffect, useRef } from 'react';
import style from './AllTypingScript.module.css';
import RestartButton from '../RestartButton/RestartButton';

interface Props { text?: string }

const AllTypingScript: React.FC<Props> = ({ text }) => {
  const [comfirmText, setComfirmText] = useState("");
  const [allCountCymbols, setAllCountCymbols] = useState<number>(45);

  useEffect(() => {
    if (text) {
      setComfirmText(text);
    }
  }, [text]);

  // Сброс при смене текста
  useEffect(() => {
    if (comfirmText.length === 0) return;
    handleReloadApp();
  }, [comfirmText]);

  const cymbols = comfirmText.split('');

  const [textIndex, setTextIndex] = useState(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);

  // Статистика 
  const [failCount, setFailCount] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0); // Добавили WPM
  const [startScript, setStartScript] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleReloadApp = () => {
    setTextIndex(0);
    setNextCymbols(comfirmText.split('').slice(0, allCountCymbols));
    setCompleteCymbols([]);
    setSeconds(0);
    setFailCount(0);
    setPressCount(0);
    setAccuracy(100);
    setWpm(0);
    setStartScript(false);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // Секундомер
  useEffect(() => {
    if (startScript === false) return;
    
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startScript]);

  // Расчет WPM и Точности
  useEffect(() => {
      // WPM = (Кол-во символов / 5) / (Минуты)
      if (seconds > 0 && textIndex > 0) {
        const words = textIndex / 5;
        const minutes = seconds / 60;
        setWpm(Math.round(words / minutes));
      } else {
        setWpm(0);
      }
      
      // Точность пересчитываем здесь или при клике (оставил логику обновления ниже, но инициализацию тут)
  }, [seconds, textIndex]);


  // Основная обработка ввода (ОРИГИНАЛЬНАЯ)
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!value) return; // Backspace

    const char = value[value.length - 1]; // последний введённый символ
    e.currentTarget.value = ""; // очищаем input

    setPressCount(prev => prev + 1);

    if (char === cymbols[textIndex]) {
      // верная буква 
      if (!startScript) setStartScript(true); // Запускаем таймер при первом верном нажатии

      const newIndex = textIndex + 1;
      setTextIndex(newIndex);

      setCompleteCymbols(cymbols.slice(Math.max(0, newIndex - allCountCymbols), newIndex));
      setNextCymbols(cymbols.slice(newIndex, newIndex + allCountCymbols));
    } 
    
    if ((startScript || char === cymbols[textIndex]) && char !== cymbols[textIndex]) {
        // Если скрипт идет и ошибка, или первая буква и ошибка (но тут таймер еще не стартует обычно)
        // Логику старта оставил как у вас: startScript становится true внутри if верной буквы.
        // Значит, ошибки до первой верной буквы не считаем за старт, но failCount растет.
        if (startScript) setFailCount(prev => prev + 1);
    }

    // Расчет точности
    // Формула: 100% - процент ошибок
    const total = pressCount + 1;
    // (textIndex / total) * 100 - это "процент нажатий, которые продвинули курсор"
    // Но лучше считать так:
    setAccuracy((textIndex / total) * 100);
  }

  return (
    <div className={style.allTypingScriptMain}>
      
      {/* 1. Блок статистики перенесен НАВЕРХ */}
      <div className={style.statsRow}>
          <div className={style.statPill}>
             Время : {seconds} S
          </div>
          <div className={style.statPillMain}>
             WPM (скорость) : {wpm}
          </div>
          <div className={style.statPill}>
             Точность : {Math.trunc(accuracy)}%
          </div>
      </div>

      {/* 2. Поле ввода (ОСТАЛОСЬ БЕЗ ИЗМЕНЕНИЙ) */}
      <div className={style.typingScriptInput} onClick={() => inputRef.current?.focus()}>
        <input
          ref={inputRef}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className={style.hiddenInput}
          onInput={handleInput}
        />

        <div className={style.typingScriptMain}>
          <div className={style.completeCymbols}>{completeCymbols}</div>
          <div className={style.cutterCymbols}> </div>
          <div className={style.nextCymbols}>{nextCymbols}</div>
        </div>
      </div>
      
      <RestartButton onButtonClick={handleReloadApp}/>
    </div>
  );
};

export default AllTypingScript;