import React from 'react';
import { useState, useEffect } from 'react';
import style from './ClassicMode.module.css';
import AllTypingScript from "../../AllTypingScript/AllTypingScript"


const ClassicMode: React.FC = ({}) => {

  const [text, setText] = useState<string>(""); 

  // useEffect(() => {
  //   fetch(`/texts.txt`) // файл должен лежать в public/texts.txt
  //     .then(res => res.text())
  //     .then(data => {
  //       const lines = data
  //         .split("\n")              // делим файл по строкам
  //         .map(l => l.trim())       // убираем пробелы
  //         .filter(l => l.length > 0); // убираем пустые строки

  //       const randomLine = lines[Math.floor(Math.random() * lines.length)];
  //       setText(randomLine);
  //     });
  // }, []);

  return (
    <div>
      <AllTypingScript onText={text}/>
    </div>
  );
};

export default ClassicMode;