"use client"

import React, { useState, useEffect } from 'react';
import curToDo_store from '../lib/curToDo_store';
import { useRouter } from 'next/navigation';
import axios from "axios"

const CurToDo: React.FC = () => {
  const { curToDoId, title, startTime, year, month, day, duration, setDuration, setIntervalId } = curToDo_store();
  const [prevDuration, setPrevDuration] = useState(0);
  const getDuration = async (id: number) => {
    const response = await axios.get('/api/duration', {
      params: {
        id
      }
    });
    return response.data;
  }
  const router = useRouter();
  const onCurToDoClick = () => {
    if (!(year === 0)) router.push(`/toDos/${year}/${month}/${day}`);
  }

  useEffect(() => {
    const fetchDuration = () => {
      if (curToDoId) {
        console.log("Dddddd")
        getDuration(curToDoId)
          .then((duration) => {
            console.log(duration)
            setPrevDuration(duration);
            setCurrentTime();
          })
      }
    }

    fetchDuration();

    const updateDuration = async (duration: number) => {
      await axios.post('/api/duration', {
        id: curToDoId,
        duration
      });
    }

    const setCurrentTime = () => {
      const initial = new Date().getTime() - new Date(startTime).getTime() + prevDuration;
      const second = Math.floor(initial / 1000);
      const minutes = Math.floor(second / 60);
      const hour = Math.floor(minutes / 60);
      if (second < 60) setDuration("1분 미만");
      else if (second < 60 * 60) {
        setDuration(`${minutes}분`);
        updateDuration(initial);
      } else {
        setDuration(`${hour}시간 ${minutes % 60}분`);
        updateDuration(initial);
      }
    }
    
    if (curToDoId) {
      const intervalId = setInterval(setCurrentTime, 60000);
      setIntervalId(+intervalId);
      return () => {
        clearInterval(intervalId)
      };
    }
  }, [curToDoId, prevDuration]);

  return (
    <div onClick={onCurToDoClick} className='bg-blue-400 px-1 rounded-md text-sm md:text-base 
    hover:scale-110 cursor-pointer transition-transform duration-200'>
      <h1 className='max-w-32 truncate ...'>진행중: {title}</h1>
      <div>경과 시간: {duration}</div>
    </div>
  );
};

export default CurToDo;