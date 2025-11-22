import React from 'react';
import styles from './ClassicMode.module.css';
import StatsDisplay from "../../StatsDisplay/StatsDisplay"

const ClassicMode: React.FC = () => {
  return (
    <div>
      <StatsDisplay/>
    </div>
  );
};

export default ClassicMode;