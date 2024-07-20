"use client"

import { completeToDo, deleteToDo } from "../[email]/toDos/[...date]/action";
import { RiCloseFill } from "react-icons/ri";
import { AnimatePresence, motion } from 'framer-motion';

interface toDosForm {
    id: number;
    title: string;
    description: string;
    date: Date;
    isComplete: boolean;
    created_at: Date;
    updated_at: Date;
    userId: number;
}

export default function ToDoList({ toDos }: { toDos: toDosForm[] }) {
    return <AnimatePresence>
        <div className="flex flex-col gap-6 mt-10 last:mb-10">
            {toDos.map((toDo, i) =>
                <motion.div key={i}
                    // initial={{ opacity: 0, y: 50 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0 }}
                    style={{opacity: toDo.isComplete ? 0.5 : 1}}
                    transition={{ duration: 0.5 }} className={`relative shadow-2xl p-5 pb-2 rounded-xl
                            bg-white text-center min-w-[250px] max-w-[300px] sm:min-w-[350px] md:min-w-[400px]`}>
                    <button onClick={() => deleteToDo(toDo.id)} className="absolute right-1 top-1"><RiCloseFill /></button>
                    <div className="flex flex-col gap-3">
                        <h1 className={`${toDo.isComplete ? "line-through" : null}  `}>{toDo.title}</h1>
                        <div className="border border-b -1 break-words" />
                        <div className="break-words">{toDo.description}</div>
                    </div>
                    <button onClick={() => completeToDo(toDo.id)} className={`${toDo.isComplete ? "bg-red-500" : "bg-blue-500"} rounded-md mt-5 px-2 text-white hover:scale-125 transition duration-200`}>{toDo.isComplete ? "취소" : "완료"}</button>
                </motion.div>)}
        </div>
    </AnimatePresence>
}