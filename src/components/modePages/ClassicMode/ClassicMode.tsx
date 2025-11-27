import React from 'react';
import { useState, useEffect } from 'react';
import style from './ClassicMode.module.css';
import AllTypingScript from "../../AllTypingScript/AllTypingScript"


const ClassicMode: React.FC = ({}) => {

  const [text, setText] = useState<string>(""); 

  const loadText = () => {
    fetch(`/texts.txt`)
      .then(res => res.text())
      .then(data => {
        const lines = data
          .split("\n")
          .map(l => l.trim())
          .filter(l => l.length > 0);

        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        setText(randomLine);
      });
  };

  
  // Первый запуск
  useEffect(() => {
    loadText();
  }, []);

  return (
    <div>
      <AllTypingScript text={text} reloadText={loadText}/>
    </div>
  );
};

export default ClassicMode;