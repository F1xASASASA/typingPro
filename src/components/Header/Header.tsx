import React from 'react';
import styles from './Header.module.css';
import { useTokens } from '../../context/TokenContext';

const Header: React.FC = () => {
  const { tokens } = useTokens();

  return (
    <header className={styles.appHeader}>
      
      {/* --- БЛОК С ТОКЕНАМИ (СЛЕВА) --- */}
      <div className={styles.tokenBadge} title="Ваши токены">
        
        {/* SVG Иконка Монеты (Material Design Style) */}
        <svg 
          className={styles.coinIcon} 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Контур монеты */}
          <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,4z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z"/>
          {/* Символ доллара внутри */}
          <path d="M12.37,15.67c-1.39,0.22-2.31,0.59-2.31,1.1c0,0.6,1.06,1.04,2.56,1.04c0.55,0,1.07-0.06,1.54-0.16l0.65,1.7 c-0.65,0.18-1.37,0.28-2.13,0.28c-3.31,0-5.26-1.57-5.26-3.79c0-1.87,1.48-3.13,4.01-3.61V15.67z M12.63,5.81 c1.45-0.19,2.4-0.53,2.4-1.02c0-0.54-1.02-0.96-2.4-0.96c-0.45,0-0.88,0.05-1.28,0.13L10.7,2.23c0.58-0.14,1.22-0.23,1.89-0.23 c3.29,0,5.08,1.55,5.08,3.59c0,1.67-1.23,2.92-3.83,3.37L12.63,5.81z"/>
          {/* Вертикальная линия */}
          <path d="M12 2L12 22" stroke="currentColor" strokeWidth="0" />
        </svg>

        <span className={styles.tokenCount}>{tokens}</span>
      </div>


      {/* ЗАГОЛОВОК (По центру) */}
      <div className={styles.appTitle}>
        <span className={styles.TitleSpanLeft}>Typing</span> <span className={styles.TitleSpanRight}>Pro</span>
      </div>
      
    </header>
  );
};

export default Header;