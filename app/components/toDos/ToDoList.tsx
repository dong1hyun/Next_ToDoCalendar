"use client"

import { AnimatePresence } from 'framer-motion';
import { toDosForm } from "@/app/lib/type";
import ToDo from "./ToDo";

interface Props {
    toDos: toDosForm[]
    year: number
    month: number
    day: number
}

export default function ToDoList({ toDos, year, month, day }: Props) {
    return <AnimatePresence>
        <div className="flex flex-col gap-6 mt-10 last:mb-10">
            {toDos.map((toDo) =>
                <ToDo key={toDo.id} toDo={toDo} year={year} month={month} day={day} />
            )}
        </div>
    </AnimatePresence>
}