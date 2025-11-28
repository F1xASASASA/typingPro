import React, { useState } from 'react';
import style from './InfoButton.module.css';

const InfoButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className={style.infoButton} 
        onClick={() => setIsOpen(true)}
        title="Справка"
      >
        ?
      </button>

      {isOpen && (
        <div className={style.overlay} onClick={() => setIsOpen(false)}>
          <div className={style.modal} onClick={(e) => e.stopPropagation()}>
            
            {/* Заголовок */}
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>Как играть?</h3>
              <div style={{color: '#555', cursor:'pointer'}} onClick={() => setIsOpen(false)}>✕</div>
            </div>
            
            {/* Контент */}
            <div className={style.modalScrollContent}>
              
              <div className={style.section}>
                <div className={style.sectionTitle}>Основные правила</div>
                <div className={style.textBlock}>
                  <p>1. Кликните на поле с текстом или нажмите любую букву, чтобы начать.</p>
                  <p>2. Печатайте символы, которые подсвечены <span className={style.highlight}>белым</span>.</p>
                  <p>3. Ошибки не блокируют ввод, но снижают точность. Исправлять их (Backspace) не нужно — просто продолжайте печатать правильно.</p>
                </div>
              </div>

              <div className={style.section}>
                <div className={style.sectionTitle}>Режимы игры</div>
                <div className={style.modesGrid}>
                  <div className={style.modeCard}>
                    <span className={style.modeName}>Классика</span>
                    <span className={style.modeDesc}>Случайные цитаты и предложения для разминки.</span>
                  </div>
                  <div className={style.modeCard}>
                    <span className={style.modeName}>Ежедневный</span>
                    <span className={style.modeDesc}>Один уникальный текст на сегодня от AI. Соревнуйтесь в <b>Лидерборде</b>!</span>
                  </div>
                  <div className={style.modeCard}>
                    <span className={style.modeName}>AI Режим</span>
                    <span className={style.modeDesc}>Введите любую тему, и нейросеть сгенерирует текст специально для вас.</span>
                  </div>
                </div>
              </div>

              <div className={style.section}>
                <div className={style.sectionTitle}>Статистика</div>
                <div className={style.textBlock}>
                  <p><b>WPM (Words Per Minute)</b> — ваша скорость. Считается по формуле: <i>(Кол-во символов / 5) / Время</i>.</p>
                  <p><b>Точность</b> — процент правильных нажатий.</p>
                </div>
              </div>

              <div className={style.section}>
                 <div className={style.sectionTitle}>Совет</div>
                 <div className={style.textBlock}>
                    Старайтесь не смотреть на клавиатуру и держите пальцы в исходной позиции <b>ФЫВА — ОЛДЖ</b>. Скорость придет со временем, главное — ритм.
                 </div>
              </div>

            </div>

            {/* Кнопка закрытия */}
            <button className={style.closeButton} onClick={() => setIsOpen(false)}>
              Все понятно, поехали!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton;