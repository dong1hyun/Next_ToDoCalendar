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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {toDos.map((toDo, index) =>
                <ToDo key={toDo.id} toDo={toDo} year={year} month={month} day={day} />
            )}
        </div>
    </AnimatePresence>
}