import React, { useState } from 'react';
import TypingAreaInput from '../TypingArea/TypingAreaInput';
import style from './StatsDisplay.module.css';
import '../../scripts/OpenPhoneKeyboard/OpenPhoneKeyboard';


const StatsDisplay: React.FC = () => {
  const [currentFailCount, setCurrentFailCount] = useState<number>(0);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(100)
  
  const handleFailCountChange = (failCount: number) => {
    setCurrentFailCount(failCount);
    console.log("Текущее количество ошибок:", failCount);
  };

  const handleAccuracy = (accuracy: number) => {
    setCurrentAccuracy(Math.trunc(accuracy))
  }
  
  return (
    <div>
      <TypingAreaInput onFailCountChange={handleFailCountChange} onAccuracy={handleAccuracy} />
      <div className={style.statsDisplayMain}>
        <div>Ошибки: {currentFailCount}</div>
        <div className="">{currentAccuracy} %</div>
      </div>
    </div>
  );
};

export default StatsDisplay;