import React, { useState, useEffect, useRef } from 'react';
import style from './AllTypingScript.module.css';
import RestartButton from '../RestartButton/RestartButton';
import InfoButton from '../InfoButton/InfoButton';
import { useTokens } from '../../context/TokenContext';
import TokenIcon from '../TokenIcon';

export interface GameModifiers {
  hardcore: boolean;
  hideCompleted: boolean;
}

interface Props { 
    text?: string;
    onGameEnd?: (wpm: number) => void; 
    modifiers?: GameModifiers;
    onBack?: () => void; // <--- НОВЫЙ ПРОП
}

const AllTypingScript: React.FC<Props> = ({ text, onGameEnd, modifiers, onBack }) => {
  const { addToken } = useTokens();
  const [rewardGiven, setRewardGiven] = useState(false);

  const [comfirmText, setComfirmText] = useState("");
  
  const getCymbolsCount = () => {
    const width = window.innerWidth;
    if (width <= 600) return 15;
    if (width <= 1250) return 25;
    return 45;
  };

  const [allCountCymbols, setAllCountCymbols] = useState<number>(getCymbolsCount());

  useEffect(() => {
    const handleResize = () => setAllCountCymbols(getCymbolsCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (text) setComfirmText(text);
  }, [text]);

  useEffect(() => {
    if (comfirmText.length === 0) return;
    handleReloadApp();
  }, [comfirmText]);

  const cymbols = comfirmText.split('');
  const [textIndex, setTextIndex] = useState(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [startScript, setStartScript] = useState<boolean>(false);
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
    setIsFinished(false);
    setRewardGiven(false);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  useEffect(() => {
    if (!startScript) return;
    const interval = setInterval(() => setSeconds(p => p + 1), 1000);
    return () => clearInterval(interval);
  }, [startScript]);

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
      if (!startScript) setStartScript(true); 

      const newIndex = textIndex + 1;
      setTextIndex(newIndex);
      setCompleteCymbols(cymbols.slice(Math.max(0, newIndex - allCountCymbols), newIndex));
      setNextCymbols(cymbols.slice(newIndex, newIndex + allCountCymbols));

      if (newIndex >= cymbols.length) {
          setStartScript(false); 
          setIsFinished(true);   
          
          let finalWpm = 0;
          if (seconds > 0) {
              const words = newIndex / 5;
              const minutes = seconds / 60;
              finalWpm = Math.round(words / minutes);
          }
          setWpm(finalWpm);

          if (!rewardGiven) {
            addToken();
            setRewardGiven(true);
          }
          if (onGameEnd) onGameEnd(finalWpm);
      }
    } else {
      if (modifiers?.hardcore) {
        handleReloadApp();
        return; 
      }
      if (startScript || char === cymbols[textIndex]) {
         if (startScript) setFailCount(prev => prev + 1);
      }
    }

    const total = pressCount + 1;
    const calculatedAcc = 100 - ((failCount + (char !== cymbols[textIndex] ? 1 : 0)) / total * 100);
    setAccuracy(Math.max(0, calculatedAcc));
  }

  // --- ЭКРАН РЕЗУЛЬТАТОВ ---
  if (isFinished) {
      return (
        <div className={style.allTypingScriptMain}>
            <div className={style.resultsContainer}>
                <h2 className={style.resultsTitle}>Результат</h2>
                <div style={{ color: '#FFD700', fontSize: '22px', marginBottom: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textShadow: '0 0 10px rgba(255, 215, 0, 0.3)' }}>
                  🎉 Вы получили +1 <TokenIcon size={28} />
                </div>
                <div className={style.resultsGrid}>
                    <div className={style.resultItem}><span className={style.resultLabel}>WPM</span><span className={`${style.resultValue} ${style.resultValuePurple}`}>{wpm}</span></div>
                    <div className={style.resultItem}><span className={style.resultLabel}>Точность</span><span className={style.resultValue}>{Math.trunc(accuracy)}%</span></div>
                    <div className={style.resultItem}><span className={style.resultLabel}>Время</span><span className={style.resultValue}>{seconds}s</span></div>
                    <div className={style.resultItem}><span className={style.resultLabel}>Ошибки</span><span className={`${style.resultValue} ${style.resultValuePink}`}>{failCount}</span></div>
                </div>

                {/* КНОПКИ */}
                <div className={style.buttonsRow}>
                   {onBack && (
                     <button className={style.secondaryButton} onClick={onBack}>
                       ← Другая тема
                     </button>
                   )}
                   <RestartButton onButtonClick={handleReloadApp}/>
                </div>
            </div>
        </div>
      );
  }

  const charsLeft = cymbols.length - textIndex;

  // --- ЭКРАН ИГРЫ ---
  return (
    <div className={style.allTypingScriptMain}>
      
      {/* Статистика сверху */}
      <div className={style.statsRow}>
          <div className={style.statPill}>
             Время : {seconds} S
          </div>
          <div className={style.statPill}>
             Осталось : {charsLeft}
          </div>
          <div className={style.statPillMain}>
             WPM (скорость) : {wpm}
          </div>
          <div className={style.statPill}>
             Точность : {Math.trunc(accuracy)}%
          </div>
      </div>

      <div className={style.infoWrapper}>
        <InfoButton />
      </div>
      
      {/* КНОПКИ */}
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