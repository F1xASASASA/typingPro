import React, { useState, useEffect, useRef } from 'react';
import styles from './TypingArea.module.css';

interface TypingAreaProps {
  onFailCountChange?: (failCount: number) => void;
  onAccuracy?: (accuracy: number) => void;
}

const TypingAreaInput: React.FC<TypingAreaProps> = ({ onFailCountChange, onAccuracy }) => {
  const text: string =
    "ВВсужен крутой ВВтекст чекать контекст нужен крутой текст ВВчекать контекст нужен крутой текст чекать контекст нужен крутой текст чекать контекст";

  const cymbols = text.split('');

  const [textIndex, setTextIndex] = useState(0);
  const [nextCymbols, setNextCymbols] = useState<string[]>([]);
  const [completeCymbols, setCompleteCymbols] = useState<string[]>([]);

  const [failCount, setFailCount] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const inputRef = useRef<HTMLInputElement>(null);

  const AllCountCymbols = 45;

  useEffect(() => {
    onFailCountChange?.(failCount);
  }, [failCount]);

  useEffect(() => {
    onAccuracy?.(accuracy);
  }, [accuracy]);

  // Инициализация
  useEffect(() => {
    setNextCymbols(cymbols.slice(0, AllCountCymbols));

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
      const newIndex = textIndex + 1;
      setTextIndex(newIndex);

      setCompleteCymbols(cymbols.slice(Math.max(0, newIndex - AllCountCymbols), newIndex));
      setNextCymbols(cymbols.slice(newIndex, newIndex + AllCountCymbols));
    } else {
      // обратка ошибки
      setFailCount(prev => prev + 1);
    }

    setAccuracy(prev => Math.round((textIndex / (pressCount + 1)) * 100));
  };

  return (
    <div className={styles.typingArea} onClick={() => inputRef.current?.focus()}>
      {/* скрытый input */}
      <input
        ref={inputRef}
        type="text"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className={styles.hiddenInput}
        onInput={handleInput}
      />

      <div className={styles.complete_cymbols}>{completeCymbols}</div>
      <div className={styles.next_cymbols}>{nextCymbols}</div>
    </div>
  );
};

export default TypingAreaInput;
export const default_FailSum = 0;