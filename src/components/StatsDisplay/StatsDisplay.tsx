import React, { useState } from 'react';
import TypingAreaInput from '../TypingArea/TypingAreaInput';
import style from './StatsDisplay.module.css';
import '../../scripts/OpenPhoneKeyboard/OpenPhoneKeyboard';


const StatsDisplay: React.FC = () => {
  const [currentFailCount, setCurrentFailCount] = useState<number>(0);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(100)
  const [currentSeconds, setCurrentSeconds] = useState<number>(0)
  
  const handleFailCountChange = (failCount: number) => {
    setCurrentFailCount(failCount);
    console.log("Текущее количество ошибок:", failCount);
  };

  const handleSeconds = (seconds: number) => {
    setCurrentSeconds(seconds);
    console.log("таймер:", seconds);
  };

  const handleAccuracy = (accuracy: number) => {
    setCurrentAccuracy(Math.trunc(accuracy))
  }
  
  return (
    <div>
      <TypingAreaInput onFailCountChange={handleFailCountChange} onAccuracy={handleAccuracy} onSeconds={handleSeconds}/>
      <div className={style.statsDisplayMain}>
        <div className="">Ошибки: {currentFailCount}</div>
        <div className="">Общее время: {currentSeconds}</div>
        <div className="">Точность: {currentAccuracy} %</div>
      </div>
    </div>
  );
};

export default StatsDisplay;