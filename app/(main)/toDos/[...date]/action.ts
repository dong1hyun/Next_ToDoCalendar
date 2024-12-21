"use server"

import db from "@/app/lib/db";
import { find_userId, toDoRevalidate } from "@/app/lib/serverUtil";

export interface formData {
    title: string,
    description: string,
    type: string
}

export async function addToDo(toDo: formData, year: number, month: number, day: number) {
    const userId = await find_userId();
    await db.toDo.create({
        data: {
            title: toDo.title,
            description: toDo.description,
            type: toDo.type,
            year,
            month,
            day,
            duration: 0,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
    toDoRevalidate({userId, year, month, day});
}

export async function getToDos(user: { id?: number, email?: string }, year: number, month: number, day: number) {
    const toDos = await db.toDo.findMany({
        where: {
            year,
            month,
            day,
            user
        },
        orderBy: {
            created_at: "asc"
        }
    });

    return toDos;
}

export const deleteToDo = async (id: number, year: number, month: number, day: number) => {
    "use server"
    const userId = await find_userId();
    await db.toDo.delete({
        where: {
            id
        }
    });
    toDoRevalidate({userId, year, month, day});
}

export const completeToDo = async (id: number, year: number, month: number, day: number, isComplete: boolean) => {
    "use server"
    const userId = await find_userId();
    await db.toDo.update({
        where: {
            id
        },
        data: {
            isComplete: !isComplete
        }
    });
    
    toDoRevalidate({userId, year, month, day});
}