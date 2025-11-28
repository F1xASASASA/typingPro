import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.appTitle}><span className={styles.TitleSpanLeft}>Typing</span> <span className={styles.TitleSpanRight}>Pro</span></div>
      {/* <button className={styles.helpButton}>?</button> */}
    </header>
  );
};

export default Header;