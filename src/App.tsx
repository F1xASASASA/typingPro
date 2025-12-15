import React, {useEffect, useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header, ModeSelection } from './components';
import WelcomePage from "./components/WelcomePage/WelcomePage";
import DailyMode from './components/modePages/DailyMode/DailyMode';
import ClassicMode from './components/modePages/ClassicMode/ClassicMode';
import AIMode from './components/modePages/AIMode/AIMode';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';


const App: React.FC = () => {

  const [] = useState('home');
  const [, setUser] = useState<UserInfo | undefined>();



	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();

		bridge.send<any>('VKWebAppShowBannerAd', {
			banner_location: 'bottom',
		   })
			.then((data) => {
				if (data.result) {
		   }
			})
			.catch((error) => {
			   console.log(error);
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

