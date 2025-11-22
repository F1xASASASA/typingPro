import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Header,
  ModeSelection,
} from './components';

import DailyMode from './components/modePages/DailyMode/DailyMode';
import ClassicMode from './components/modePages/ClassicMode/ClassicMode';
import InfinityMode from './components/modePages/InfinityMode/InfinityMode';

import './App.css';



const App: React.FC = () => {
  return (

  <BrowserRouter>
      <div className="vk-mini-app-main">
        <Header/>
        <div className='app-wrapper'>
          <ModeSelection/>
          <main className="app-main">
            <Routes>
              <Route path="/dailyMode" element={<DailyMode />} />
              <Route path="/classicMode" element={<ClassicMode />} />
              <Route path="/infinityMode" element={<InfinityMode />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>

    // <div className="vk-mini-app-main">
    //   <Header />
    //   <div className='app-wrapper'>
    //     <main className="app-main">
    //       <ModeSelection />
    //       <StatsDisplay />
    //       <StartButton />
    //     </main>
    //   </div>
    // </div>
  );
};

export default App;