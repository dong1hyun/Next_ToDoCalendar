"use client"

import { completeToDo, deleteToDo } from "../[email]/toDos/[...date]/action";
import { RiCloseFill } from "react-icons/ri";

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
    return <div className="flex flex-col gap-5 mt-10 last:mb-10">
        {toDos.map((toDo, i) =>
            <div key={i} className={`relative shadow-2xl p-5 rounded-xl ${toDo.isComplete ? "opacity-50" : null}  
            bg-white text-center max-w-[250px] md:max-w-[400px]`}>
                <button onClick={() => deleteToDo(toDo.id)} className="absolute right-1 top-1"><RiCloseFill className="bg-red-400 rounded-full size-3" /></button>
                <div className="flex flex-col gap-3">
                    <h1 className={`${toDo.isComplete ? "line-through" : null}  `}>{toDo.title}</h1>
                    <div className="border border-b -1" />
                    <div>{toDo.description}</div>
                </div>
                <button onClick={() => completeToDo(toDo.id)} className="bg-blue-500 rounded-md mt-5 px-2 text-white">완료</button>
            </div>)}
    </div>
}