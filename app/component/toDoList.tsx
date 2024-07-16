"use client"

import { deleteToDo } from "../[email]/toDos/[...date]/action";

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

export default function ToDoList({toDos}: {toDos: toDosForm[]}) {
    return <div className="flex flex-col gap-5 mt-10">
        {toDos.map((toDo, i) =>
            <div key={i} className="flex flex-col gap-3">
                <h1>{toDo.title}</h1>
                <div>{toDo.description}</div>
                <button onClick={() => deleteToDo(toDo.id)}>삭제</button>
            </div>)}
    </div>
}