import React from 'react'
import style from './RestartButton.module.css'

interface ChildComponentProps {
  onButtonClick: (message: string) => void;
}

const RestartButton: React.FC<ChildComponentProps> = ({onButtonClick}) => {
  return (
    <div>
      <button className={style.startButton} onClick={() => onButtonClick('Привет из дочернего компонента!')}>Начать сначала</button>
    </div>
  )
}

export default RestartButton
