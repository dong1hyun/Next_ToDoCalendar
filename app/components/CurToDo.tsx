"use client"

import React, { useState, useEffect } from 'react';
import curToDo_store from '../lib/curToDo_store';

const CurToDo: React.FC = () => {
  const { title, startTime } = curToDo_store();
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const setCurrentTime = () => {
      const initial = new Date().getTime() - new Date(startTime).getTime();
      const second = Math.floor(initial / 1000);
      const minutes = Math.floor(second / 60);
      const hour = Math.floor(minutes / 60);
      if(second < 60) setElapsedTime("1분 미만");
      else if(second < 60 * 60) {
        setElapsedTime(`${minutes}분`);
      } else {
        setElapsedTime(`${hour}시간 ${minutes % 60}분`);
      }
    }

    if (startTime) {
      const intervalId = setInterval(setCurrentTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  return (
    <div>
      <h1>현재 진행중인 일: {title}</h1>
      <div>경과 시간: {elapsedTime}</div>
    </div>
  );
};

export default CurToDo;