import React from 'react';
import style from './WelcomePage.module.css';

const WelcomePage: React.FC = () => {
    return (
        <div className={style.welcomeContainer}>
            <div className={style.infoBox}>
                <div className={style.titleSection}>
                    <h1 className={style.title}>Привет!</h1>
                </div>
                <div className={style.contentSection}>
                    <p className={style.text}>
                        Тут ты сможешь проверить то, насколько ты быстро печатаешь без ошибок.
                    </p>
                    
                    <p className={style.subText}>
                        Чтобы начать, просто выбери любой из режимов
                    </p>
                </div>

            </div>
        </div>
    );
};

export default WelcomePage;