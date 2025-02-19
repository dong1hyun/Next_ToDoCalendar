"use client"

import { AnimatePresence } from 'framer-motion';
import { toDosForm } from "@/app/lib/type";
import ToDo from "./ToDo";

interface Props {
    toDos: toDosForm[]
}

export default function ToDoList({ toDos }: Props) {
    return <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {toDos.map((toDo) =>
                <ToDo key={toDo.id} toDo={toDo} />
            )}
        </div>
    </AnimatePresence>
}