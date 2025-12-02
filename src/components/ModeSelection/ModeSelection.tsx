import React, { useState, useEffect } from 'react';
import styles from './ModeSelection.module.css';
import { Link, useLocation } from 'react-router-dom';

const ModeSelection: React.FC = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const modes = [
    { path: '/classicMode', label: 'Классический' },
    { path: '/dailyMode', label: 'Ежедневный' },
    { path: '/aiMode', label: 'AI Режим' }
  ];
  useEffect(() => {
    const index = modes.findIndex(mode => 
      location.pathname.toLowerCase().includes(mode.path.toLowerCase())
    );
    setActiveIndex(index);
  }, [location.pathname]);

  return (
    <div className={styles.modeSelection}>

      <div 
        className={styles.slider} 
        style={{ 
          transform: `translateX(${activeIndex * 100}%)`,
          opacity: activeIndex === -1 ? 0 : 1 
        }} 
      />

      {modes.map((mode, index) => {
        const isActive = index === activeIndex;
        
        return (
          <Link 
            key={mode.path}
            className={`${styles.modeButton} ${isActive ? styles.modeButtonActive : ''}`} 
            to={mode.path}
          >
            {mode.label}
          </Link>
        );
      })}
    </div>
  );
};

export default ModeSelection;