import React, { useEffect } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import vkBridge from '@vkontakte/vk-bridge';
import { Header, ModeSelection } from './components';
import WelcomePage from "./components/WelcomePage/WelcomePage";
import DailyMode from './components/modePages/DailyMode/DailyMode';
import ClassicMode from './components/modePages/ClassicMode/ClassicMode';
import AIMode from './components/modePages/AIMode/AIMode';
import { TokenProvider } from './context/TokenContext';

const App: React.FC = () => {

  useEffect(() => {
    // 1. Проверяем, что React вообще запустился
    // alert('Старт приложения...'); 

    vkBridge.send('VKWebAppInit');

    // 2. Пробуем показать рекламу
    vkBridge.send('VKWebAppShowBannerAd', {
      banner_location: 'bottom'
      // layout_type не указываем, пусть ВК сам ужмет экран (resize)
    } as any)
    .then((data) => { 
      if (data.result) {
        // console.log('✅ УСПЕХ: Баннер отрисован!');
      } else {
        // console.log('⚠️ ПУСТО: Result пришел false');
      }
    })
    .catch((error) => {
       console.log("Banner Error", error);
    });

  }, []);

  return (
    <TokenProvider>
      <HashRouter>
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
                <Route path="/aiMode" element={<AIMode />} /> 
                <Route path="*" element={<WelcomePage />} />
              </Routes>
            </main>
          </div>
        </div>
      </HashRouter>
    </TokenProvider>
  );
};

export default App;