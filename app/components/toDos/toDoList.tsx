"use client"

import { completeToDo, deleteToDo } from "../../(main)/toDos/[...date]/action";
import { RiCloseFill } from "react-icons/ri";
import { AnimatePresence, motion } from 'framer-motion';
import { FcTodoList } from "react-icons/fc";
import { formatToTimeAgo } from "../../lib/util";
import { FaPlayCircle } from "react-icons/fa";
import curToDo_store from "../../lib/curToDo_store";
import { useState } from "react";

interface toDosForm {
    id: number;
    title: string;
    description: string;
    type: string;
    year: number;
    month: number;
    day: number;
    isComplete: boolean;
    duration: number;
    created_at: Date;
    updated_at: Date;
    userId: number;
}

export default function ToDoList({ toDos, year, month, day }: { toDos: toDosForm[], year: number, month: number, day: number }) {
    const { curToDoId, setCurToDo, intervalId, setDuration } = curToDo_store();
    const onPlayClick = (id: number, title: string) => {
        setCurToDo(id, title, year, month, day);
    }
    const onCompleteClick = (id: number, year: number, month: number, day: number) => {
        completeToDo(id, year, month, day);
        if (id === curToDoId) {
            setCurToDo(0, "없음", 0, 0, 0);
            setDuration("");
            clearInterval(intervalId);
        }
    }
    return <AnimatePresence>
        <div className="flex flex-col gap-6 mt-10 last:mb-10">
            {toDos.map((toDo, i) => {
                const date = toDo.created_at;
                return <motion.div key={i}
                    style={{ opacity: toDo.isComplete ? 0.5 : 1 }}
                    transition={{ duration: 0.5 }} className={`relative shadow-2xl p-5 pb-2 rounded-xl
                            bg-white text-center w-[300px] sm:min-w-[350px] md:min-w-[400px]`}>
                    <button onClick={() => deleteToDo(toDo.id, year, month, day)} className="absolute right-1 top-1"><RiCloseFill /></button>
                    <div className="flex flex-col gap-3 relative">
                        <div className="absolute flex items-center gap-1 opacity-65"><FcTodoList className="size-5" />{toDo.type}</div>
                        <h1 className={`${toDo.isComplete ? "line-through" : null}  `}>{toDo.title}</h1>
                        <div className="border border-b -1 break-words" />
                        <div className="break-words">{toDo.description}</div>
                    </div>
                    <button onClick={() => onCompleteClick(toDo.id, year, month, day)} className={`${toDo.isComplete ? "bg-red-500" : "bg-blue-500"} rounded-md mt-5 px-2 text-white hover:scale-125 transition duration-200`}>{toDo.isComplete ? "취소" : "완료"}</button>
                    {toDo.isComplete ? null : <button onClick={() => onPlayClick(toDo.id, toDo.title)}><FaPlayCircle className="absolute right-2 top-1/2 size-5" /></button>}
                    <div className="absolute right-0 bottom-0 p-1 text-xs font-bold opacity-65">{formatToTimeAgo(date.toString())}</div>
                </motion.div>
            }
            )}
        </div>
    </AnimatePresence>
}