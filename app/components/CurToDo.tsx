"use client"

import React, { useState, useEffect, useRef } from 'react';
import curToDo_store from '../lib/curToDo_store';
import { useRouter } from 'next/navigation';
import axios from "axios"
import { buttonStyle } from '../lib/css';

const CurToDo: React.FC = () => {
  const { curToDoId, title, startTime, year, month, day, duration, setDuration, setIntervalId } = curToDo_store(); // 현재 실행중인 toDo
  const [prevDuration, setPrevDuration] = useState(0); // 과거의 toDo 경과 시간
  const isMounted = useRef(false);
  const getDuration = async (id: number) => { // 과거의 toDo 경과 시간을 가져옴
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

  const updateDuration = async (duration: number) => { //경과 시간 업데이트
    await axios.post('/api/duration', {
      id: curToDoId,
      duration,
    });
  }

  const setCurrentTime = () => {
    const initial = new Date().getTime() - new Date(startTime).getTime() + prevDuration; // 새로 측정하는 경과 시간에 이전 경과시간을 더해줌
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
  };

  const fetchDuration = () => {
    if (curToDoId) {
      getDuration(curToDoId)
        .then((duration) => {
          if (prevDuration === duration) setPrevDuration(duration + 1); // 새로 가져온 과거 duration과 앞서 저장되어 있던 duration과 같을 경우
          else setPrevDuration(duration); // 강제로 아래 useEffect를 실행해주기 위해서 일부러 변화를 줌
        });
    }
  }

  useEffect(() => {
    if (curToDoId) {
      fetchDuration(); // 새로운 작업 시작할 시 그 작업의 과거 경과 시간 fetch
    }
  }, [curToDoId]);

  useEffect(() => {
    if (curToDoId) {
      setDuration("계산중");
      if (isMounted.current) {
        isMounted.current = false;
        setCurrentTime(); // 최초 1회는 무조건 실행
        const intervalId = setInterval(setCurrentTime, 60000); //1분마다 경과 시간 체크 및 경과 시간 업데이트(디비 update)
        setIntervalId(+intervalId);
        return () => {
          clearInterval(intervalId);
        };
      } else {
        isMounted.current = true;
      }
    }
  }, [curToDoId, prevDuration]);

  return (
    <div onClick={onCurToDoClick} className={`${buttonStyle} bg-black px-4 text-sm`}>
      <h1 className='max-w-32 truncate ...'>진행중: {title}</h1>
      <div>경과 시간: {duration}</div>
    </div>
  );
};

export default CurToDo;