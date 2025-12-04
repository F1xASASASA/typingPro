import React from 'react';
import { useState, useEffect } from 'react';
import AllTypingScript from "../../AllTypingScript/AllTypingScript";
import style from './ClassicMode.module.css'; // Импортируем стили

const ClassicMode: React.FC = ({}) => {

  const [text, setText] = useState<string>(""); 

  useEffect(() => {
    fetch(`/texts.txt`)
      .then(res => res.text())
      .then(data => {
        const lines = data
          .split("\n")
          .map(l => l.trim())
          .filter(l => l.length > 0); // убираем пустые строки

        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        setText(randomLine);
      })
      .catch(err => console.error("Ошибка загрузки текста:", err));
  }, []); // Убрал [text] из зависимостей, чтобы не циклило, оставил пустой массив для запуска 1 раз

  return (
    <div className={style.classicContainer}>
      {text ? (
        <AllTypingScript text={text}/>
      ) : (
        <div style={{color: '#fff', fontSize: '18px'}}>Загрузка классики...</div>
      )}
    </div>
  );
};

export default ClassicMode;