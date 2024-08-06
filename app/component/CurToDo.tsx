"use client"

import React, { useState } from 'react';
import curToDo_store from '../lib/curToDo_store';

const CurToDo: React.FC = () => {
  const { title, startTime } = curToDo_store();
  const [elapsedTime, setElapsedTime] = useState(0);
  if (startTime) {
    console.log(new Date().getTime() - new Date(startTime).getTime());
    // setElapsedTime(new Date().getTime() - new Date(startTime).getTime());
  }

  return (
    <div>
      <h1>현재 진행중인 일: {title}</h1>
      <div>경과 시간: {elapsedTime}</div>
    </div>
  );
};

export default CurToDo;