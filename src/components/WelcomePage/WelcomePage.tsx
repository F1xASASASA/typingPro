import React from 'react';
import style from './WelcomePage.module.css';

const WelcomePage: React.FC = () => {
    return (
        <div className={style.welcomePageMain}>
            <h1>Приветствуем!</h1>
        </div>
    );
};

export default WelcomePage;