"use client"

import { completeToDo, deleteToDo, getToDo } from "@/app/(main)/toDos/[...date]/action";
import { findUserEmail } from "@/app/lib/serverUtil";
import toDoStore from "@/app/lib/ToDoStore";
import { useCallback, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { motion } from "framer-motion"

const ToDoDetail = () => {
    const { curToDoId, setCurToDo, setDuration, intervalId, setOpenToDoId, openToDoId } = toDoStore();
    const [toDo, setToDo] = useState({
        year: 0,
        month: 0,
        day: 0,
        title: "",
        duration: 0,
        id: 0,
        description: "",
        type: "",
        isComplete: false,
        created_at: new Date,
        updated_at: new Date,
        userEmail: "",
    });
    const [loading, setLoading] = useState(false);
    const getToDoData = async () => {
        if (openToDoId > 0) {
            try {
                setLoading(true);
                const email = await findUserEmail();
                const toDo = await getToDo(email, openToDoId);
                setToDo(toDo);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getToDoData();
    }, [openToDoId]);

    const onCloseClick = () => {
        setOpenToDoId(0);
    }

    const onPlayClick = useCallback(() => {
        setCurToDo(toDo.id, toDo.title, toDo.year, toDo.month, toDo.day);
    }, [toDo]);

    const stopTimer = useCallback(() => {
        setCurToDo(0, "없음", 0, 0, 0);
        setDuration("");
        clearInterval(intervalId);
    }, []);

    const onDeleteClick = useCallback((id: number, year: number, month: number, day: number) => {
        deleteToDo(id, year, month, day);
        if (id === curToDoId) stopTimer();
        setOpenToDoId(0);
    }, [curToDoId]);

    const onCompleteClick = useCallback(async () => {
        if (openToDoId === curToDoId) stopTimer();
        await completeToDo(toDo.id, toDo.year, toDo.month, toDo.day, toDo.isComplete);
        getToDoData();
    }, [toDo, curToDoId]);

    if (openToDoId === 0) return null;

    return (
        <motion.article className="fixed bg-white rounded-xl px-6 pt-4 pb-10 flex flex-col items-center 
        gap-4 w-[330px] h-[200px] shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {
                loading ?
                    <div>Loading...</div>
                    :
                    <>
                        <div className="border-b border-solid border-neutral-300">
                            {toDo.title}
                        </div>
                        <div className="overflow-y-scroll">
                            {toDo.description}
                        </div>
                        <button onClick={() => onCloseClick()} className="absolute right-1 top-1"><RiCloseFill /></button>
                        <div className="absolute bottom-3 flex gap-2">
                            <button onClick={onCompleteClick}
                                className={`${toDo.isComplete ? "bg-orange-500" : "bg-blue-500"} 
                             rounded-md px-2 text-white hover:scale-125 transition duration-200`}>
                                {toDo.isComplete ? "취소" : "완료"}
                            </button>
                            <button className="rounded-md px-2 text-white hover:scale-125 transition duration-200 bg-red-500" onClick={() => onDeleteClick(toDo.id, toDo.year, toDo.month, toDo.day)}>삭제</button>
                        </div>
                        {toDo.isComplete ? null : <button onClick={onPlayClick}><FaPlayCircle className="absolute right-2 top-1/2 size-5" /></button>}
                    </>
            }
        </motion.article>
    )
};

export default ToDoDetail;