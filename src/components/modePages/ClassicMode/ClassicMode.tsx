import React from 'react';
import { useState, useEffect } from 'react';
import style from './ClassicMode.module.css';
import AllTypingScript from "../../AllTypingScript/AllTypingScript"


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
      });
  }, [text]);

  return (
    <div>
      <AllTypingScript text={text}/>
    </div>
  );
};

export default ClassicMode;