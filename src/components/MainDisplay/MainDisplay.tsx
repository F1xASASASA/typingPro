import React, { useState } from 'react';
// import TypingAreaInput from '../TypingArea/TypingAreaInput';
import style from './MainDisplay.module.css';
import RestartButton from '../StartButton/StartButton';

const MainDisplay: React.FC = () => {
  
  const [currentFailCount, setCurrentFailCount] = useState<number>(0);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(100)
  const [currentSeconds, setCurrentSeconds] = useState<number>(0)
  const [currentCountPerSecond, setcurrentCountPerSecond] = useState<number>(0)
  
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

  const handleCountPerSecond = (countPerSecond: number) =>{
    setcurrentCountPerSecond(countPerSecond)
  }

  const handleReloadApp = (message: string) => {
    console.log('Кнопка нажата!', message);
    //* Дополнительная логика
  };

  return (
    <div className={style.statsDisplayWrapper}>
      {/* <TypingAreaInput onFailCountChange={handleFailCountChange} onAccuracy={handleAccuracy} onSeconds={handleSeconds} onCountPerSecond={handleCountPerSecond}/> */}
      <div className={style.statsDisplayMain}>
        <div className="">Ошибки: {currentFailCount}</div>
        <div className="">Общее время: {currentSeconds}</div>
        <div className="">Точность: {currentAccuracy} %</div>
        <div className="">Cимв/сек: {currentCountPerSecond}</div>
      </div>
      <RestartButton onButtonClick={handleReloadApp} />
    </div>
  );
};

export default MainDisplay;