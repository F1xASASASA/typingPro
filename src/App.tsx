import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, ModeSelection } from './components';
import WelcomePage from "./components/WelcomePage/WelcomePage";
import DailyMode from './components/modePages/DailyMode/DailyMode';
import ClassicMode from './components/modePages/ClassicMode/ClassicMode';
// import InfinityMode from './components/modePages/InfinityMode/InfinityMode'; // Удаляем старый
import AIMode from './components/modePages/AIMode/AIMode'; // Добавляем новый

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="vk-mini-app-main">
        <Header/>
        <div className='app-wrapper'>
          <ModeSelection/>
          <main className="app-main">
            <Routes>
              <Route index element={<WelcomePage/>} />
              <Route path='/welcomePage' element={<WelcomePage/>}/>
              <Route path="/dailyMode" element={<DailyMode />} />
              <Route path="/classicMode" element={<ClassicMode />} />
              {/* Меняем infinityMode на aiMode */}
              <Route path="/aiMode" element={<AIMode />} /> 
              <Route path="*" element={<WelcomePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;