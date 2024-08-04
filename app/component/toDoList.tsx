"use client"

import { completeToDo, deleteToDo } from "../[email]/toDos/[...date]/action";
import { RiCloseFill } from "react-icons/ri";
import { AnimatePresence, motion } from 'framer-motion';
import { FcTodoList } from "react-icons/fc";
import { formatToTimeAgo } from "../lib/util";

interface toDosForm {
    id: number;
    title: string;
    description: string;
    type: string;
    year: number;
    month: number;
    day: number;
    isComplete: boolean;
    created_at: Date;
    updated_at: Date;
    userId: number;
}

export default function ToDoList({ toDos }: { toDos: toDosForm[] }) {
    console.log(toDos)
    return <AnimatePresence>
            <div className="flex flex-col gap-6 mt-10 last:mb-10">
                {toDos.map((toDo, i) => {
                    const date = toDo.created_at;
                    return <motion.div key={i}
                        style={{ opacity: toDo.isComplete ? 0.5 : 1 }}
                        transition={{ duration: 0.5 }} className={`relative shadow-2xl p-5 pb-2 rounded-xl
                            bg-white text-center w-[300px] sm:min-w-[350px] md:min-w-[400px]`}>
                        <button onClick={() => deleteToDo(toDo.id)} className="absolute right-1 top-1"><RiCloseFill /></button>
                        <div className="flex flex-col gap-3 relative">
                            <div className="absolute flex items-center gap-1 opacity-65"><FcTodoList className="size-5" />{toDo.type}</div>
                            <h1 className={`${toDo.isComplete ? "line-through" : null}  `}>{toDo.title}</h1>
                            <div className="border border-b -1 break-words" />
                            <div className="break-words">{toDo.description}</div>
                        </div>
                        <button onClick={() => completeToDo(toDo.id)} className={`${toDo.isComplete ? "bg-red-500" : "bg-blue-500"} rounded-md mt-5 px-2 text-white hover:scale-125 transition duration-200`}>{toDo.isComplete ? "취소" : "완료"}</button>
                        <div className="absolute right-0 bottom-0 p-1 text-xs font-bold opacity-65">{formatToTimeAgo(date.toString())}</div>
                    </motion.div>
                }
                )}
            </div>
        </AnimatePresence>
}