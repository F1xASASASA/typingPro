import React from 'react';
import {
  Header,
  ModeSelection,
  TypingArea,
  StatsDisplay,
  StartButton,
} from './components';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="vk-mini-app-main">
      <Header />
      <div className='app-wrapper'>
        <main className="app-main">
          <ModeSelection />
          <TypingArea />
          <StatsDisplay />
          <StartButton />
        </main>
      </div>
    </div>
  );
};

export default App;