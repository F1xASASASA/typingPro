import React, { useState } from 'react';
import style from './InfoButton.module.css';

const InfoButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className={style.infoButton} 
        onClick={() => setIsOpen(true)}
        title="Помощь и горячие клавиши"
      >
        ?
      </button>

      {isOpen && (
        <div className={style.overlay} onClick={() => setIsOpen(false)}>
          <div className={style.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={style.modalTitle}>Информация</h3>
            
            <div className={style.modalContent}>
              <p style={{marginTop: 20, fontSize: 14, color: '#aaa', textAlign: 'center'}}>
                Как играть?

Все просто:

    Выберите режим: Цитата или На время.
    Кликните на область с текстом (или нажмите Tab).
    Начинайте печатать текст, который видите на экране.
    Ошибки подсвечиваются красным. Используйте Backspace для исправления.
    Тест завершится автоматически (по окончании текста или времени), либо вы можете нажать "Новый тест".

Режимы игры:

    Цитата: Наберите предложенный текст как можно быстрее и точнее. Время не ограничено, но учитывается при расчете WPM.
    На время: Наберите как можно больше символов за 60 секунд. Точность также важна!

Что такое WPM?

WPM (Words Per Minute) - скорость печати, измеряемая в словах в минуту. Условно считается, что одно "слово" равно 5 символам (включая пробелы).

    WPM (чистый): Рассчитывается на основе правильно набранных символов.
    Raw WPM (сырой): Рассчитывается на основе всех набранных символов (включая ошибки).

Точность

Процент правильно набранных символов от общего числа попыток ввода (без учета Backspace).
Советы:

    Старайтесь не смотреть на клавиатуру.
    Держите пальцы в исходной позиции (ФЫВА ОЛДЖ).
    Практикуйтесь регулярно!
              </p>
            </div>

            <button className={style.closeButton} onClick={() => setIsOpen(false)}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton;