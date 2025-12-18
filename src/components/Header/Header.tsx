import React from 'react';
import styles from './Header.module.css';
import { useTokens } from '../../context/TokenContext';

const Header: React.FC = () => {
  const { tokens } = useTokens();

  return (
    <header className={styles.appHeader}>
      <div className={styles.appTitle}>
        <span className={styles.TitleSpanLeft}>Typing</span> <span className={styles.TitleSpanRight}>Pro</span>
      </div>
      
      {/* Блок с токенами */}
      <div style={{ 
        position: 'absolute', 
        right: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        background: 'rgba(0,0,0,0.3)',
        padding: '5px 12px',
        borderRadius: '20px',
        border: '1px solid #9370db'
      }}>
        <span style={{ fontSize: '20px' }}>💎</span>
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{tokens}</span>
      </div>
    </header>
  );
};

export default Header;