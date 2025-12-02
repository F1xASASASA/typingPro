import React, { useState, useEffect, useRef } from 'react';
import style from './AllTypingScript.module.css';
import RestartButton from '../RestartButton/RestartButton';
import InfoButton from '../InfoButton/InfoButton';

interface Props { 
    text?: string;
    // Callback функция, вызываемая при завершении игры
    onGameEnd?: (wpm: number) => void; 
}

const AllTypingScript: React.FC<Props> = ({ text, onGameEnd }) => {
  const [comfirmText, setComfirmText] = useState("");
  // Количество символов слева и справа
  const [allCountCymbols, setAllCountCymbols] = useState<number>(45);

  useEffect(() => {
    if (text) {
      setComfirmText(text);
    }
  }, [text]);
console.log(text);
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
  const [wpm, setWpm] = useState(0);
  const [startScript, setStartScript] = useState<boolean>(false);
  
  // Состояние завершения (показывает модалку)
  const [isFinished, setIsFinished] = useState<boolean>(false);

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
    setIsFinished(false); // Сбрасываем экран результатов
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // Секундомер
  useEffect(() => {
    if (!startScript) return;
    
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startScript]);

  // Расчет WPM и Точности в реальном времени
  useEffect(() => {
      if (!isFinished && seconds > 0 && textIndex > 0) {
        const words = textIndex / 5;
        const minutes = seconds / 60;
        setWpm(Math.round(words / minutes));
      }
  }, [seconds, textIndex, isFinished]);


  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value) return; 

    const char = value[value.length - 1]; 
    e.currentTarget.value = ""; 

    setPressCount(prev => prev + 1);

    if (char === cymbols[textIndex]) {
      // Верная буква 
      if (!startScript) setStartScript(true); 

      const newIndex = textIndex + 1;
      setTextIndex(newIndex);

      setCompleteCymbols(cymbols.slice(Math.max(0, newIndex - allCountCymbols), newIndex));
      setNextCymbols(cymbols.slice(newIndex, newIndex + allCountCymbols));

      // --- ПРОВЕРКА НА КОНЕЦ ТЕКСТА ---
      if (newIndex >= cymbols.length) {
          setStartScript(false); // Останавливаем таймер
          setIsFinished(true);   // Показываем экран результатов
          
          // Рассчитываем финальный WPM (чтобы передать точное значение)
          let finalWpm = 0;
          if (seconds > 0) {
              const words = newIndex / 5;
              const minutes = seconds / 60;
              finalWpm = Math.round(words / minutes);
          }
          setWpm(finalWpm);

          // Отправляем данные в родительский компонент (DailyMode)
          if (onGameEnd) {
              onGameEnd(finalWpm);
          }
      }

    } 
    
    // Обработка ошибок
    if ((startScript || char === cymbols[textIndex]) && char !== cymbols[textIndex]) {
        if (startScript) setFailCount(prev => prev + 1);
    }

    // Расчет точности
    const total = pressCount + 1;
    const calculatedAcc = 100 - ((failCount + (char !== cymbols[textIndex] ? 1 : 0)) / total * 100);
    setAccuracy(Math.max(0, calculatedAcc));
  }

  // --- ЭКРАН РЕЗУЛЬТАТОВ (ПОСЛЕ ЗАВЕРШЕНИЯ) ---
  if (isFinished) {
      return (
        <div className={style.allTypingScriptMain}>
            <div className={style.resultsContainer}>
                <h2 className={style.resultsTitle}>Результат</h2>
                
                <div className={style.resultsGrid}>
                    <div className={style.resultItem}>
                        <span className={style.resultLabel}>WPM</span>
                        <span className={`${style.resultValue} ${style.resultValuePurple}`}>{wpm}</span>
                    </div>
                    <div className={style.resultItem}>
                        <span className={style.resultLabel}>Точность</span>
                        <span className={style.resultValue}>{Math.trunc(accuracy)}%</span>
                    </div>
                    <div className={style.resultItem}>
                        <span className={style.resultLabel}>Время</span>
                        <span className={style.resultValue}>{seconds}s</span>
                    </div>
                    <div className={style.resultItem}>
                        <span className={style.resultLabel}>Ошибки</span>
                        <span className={`${style.resultValue} ${style.resultValuePink}`}>{failCount}</span>
                    </div>
                </div>

                <RestartButton onButtonClick={handleReloadApp}/>
            </div>
        </div>
      );
  }

  // --- ЭКРАН ПЕЧАТИ (ВО ВРЕМЯ ИГРЫ) ---
  return (
    <div className={style.allTypingScriptMain}>
      
      {/* Статистика сверху */}
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

      {/* Кнопка Инфо */}
      <div style={{ width: '1200px', display: 'flex', justifyContent: 'flex-start', marginBottom: '-30px', paddingLeft: '20px', zIndex: 5 }}>
        <InfoButton />
      </div>

      {/* Поле ввода */}
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