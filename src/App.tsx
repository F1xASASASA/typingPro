import React, { useEffect } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import vkBridge from '@vkontakte/vk-bridge';
import { Header, ModeSelection } from './components';
import WelcomePage from "./components/WelcomePage/WelcomePage";
import DailyMode from './components/modePages/DailyMode/DailyMode';
import ClassicMode from './components/modePages/ClassicMode/ClassicMode';
import AIMode from './components/modePages/AIMode/AIMode';

const App: React.FC = () => {

  useEffect(() => {
    vkBridge.send('VKWebAppInit');

    vkBridge.send('VKWebAppShowBannerAd', {
      // ИСПРАВЛЕНИЕ ЗДЕСЬ: добавляем 'as const'c
      banner_location: 'bottom' as any
    })
    .then((data) => { 
      if (data.result) {
        console.log('Баннер успешно показан');
      }
    })
    .catch((error) => {
      console.log('Ошибка показа баннера:', error);
    });
  }, []);


  return (
    <HashRouter>
      <div className="vk-mini-app-main">
        <Header/>
        <div className='app-wrapper'>
          <ModeSelection/>
          <main className="app-main" style={{ paddingBottom: '120px' }}>
            <Routes>
              <Route index element={<WelcomePage/>} />
              <Route path='/welcomePage' element={<WelcomePage/>}/>
              <Route path="/dailyMode" element={<DailyMode />} />
              <Route path="/classicMode" element={<ClassicMode />} />
              <Route path="/aiMode" element={<AIMode />} /> 
              <Route path="*" element={<WelcomePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;