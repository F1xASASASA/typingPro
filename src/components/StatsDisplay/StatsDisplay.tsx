import React, { useState } from 'react';
import TypingArea from '../TypingArea/TypingArea';

const StatsDisplay: React.FC = () => {
  const [currentFailCount, setCurrentFailCount] = useState<number>(0);

  const handleFailCountChange = (failCount: number) => {
    setCurrentFailCount(failCount);
    console.log("Текущее количество ошибок:", failCount);
  };

  return (
    <div>
      <TypingArea onFailCountChange={handleFailCountChange} />
      <div>Ошибки: {currentFailCount}</div>
    </div>
  );
};



// import React  from 'react';
// import styles from './StatsDisplay.module.css';


// const StatsDisplay: React.FC = () => {
//   return (
//     <div className={styles.statsDisplay}>
//       <div className={styles.statItem}>
//         Время :  S
//       </div>
//       <div className={styles.statItem}>
//         WPM (скорость) : 
//       </div>
//       <div className={styles.statItem}>
//         Точность : %
//       </div>
//     </div>
//   );
// };

export default StatsDisplay;