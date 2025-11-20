import React from 'react';
import styles from './ModeSelection.module.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import DailyMode from '../modePages/DailyMode/dailyMode';
import ClassicMode from '../modePages/ClassicMode/classicMode';
import InfinityMode from '../modePages/InfinityMode/infinityMode';

const ModeSelection: React.FC = () => {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/dailyMode" element={<DailyMode/>} />
        <Route path="/classicMode" element={<ClassicMode/>} /> 
        <Route path="/infinityMode" element={<InfinityMode/>} />
      </Routes>

      {/* https://ru.hexlet.io/blog/posts/react-router-v6 */}
      
    </BrowserRouter>
  </React.StrictMode>
  );
};

export default ModeSelection;


    // <div className={styles.modeSelection}>
    //   <button className={styles.modeButton}>максимум слов</button>
    //   <div className={styles.currentMode}>Классический режим</div>
    //   <button className={styles.modeButton} >бесконечность</button>
    // </div>