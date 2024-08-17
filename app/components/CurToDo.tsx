"use client"

import React, { useState, useEffect } from 'react';
import curToDo_store from '../lib/curToDo_store';
import { useRouter } from 'next/navigation';

const CurToDo: React.FC = () => {
  const { title, startTime, year, month, day } = curToDo_store();
  const [elapsedTime, setElapsedTime] = useState("");
  const router = useRouter();
  const onCurToDoClick = () => {
    if(!(year === 0)) router.push(`/toDos/${year}/${month}/${day}`);
  }

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
    <div onClick={onCurToDoClick} className='bg-blue-400 px-1 rounded-md text-sm md:text-base 
    hover:scale-110 cursor-pointer transition-transform duration-200'>
      <h1 className='max-w-32 truncate ...'>진행중: {title}</h1>
      <div>경과 시간: {elapsedTime}</div>
    </div>
  );
};

export default CurToDo;