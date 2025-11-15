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
    <div className="vk-mini-app">
      <Header />
      <main className="app-main">
        <ModeSelection />
        <TypingArea />
        <StatsDisplay />
        <StartButton />
      </main>
    </div>
  );
};

export default App;