"use server"

import db from "@/app/lib/db";
import { findUserEmail, toDoRevalidate } from "@/app/lib/serverUtil";
import { revalidateTag } from "next/cache";

export interface formData {
    title: string,
    description: string,
    type: string
}

export async function addToDo(toDo: formData, year: number, month: number, day: number) {
    const email = await findUserEmail();
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
                    email
                }
            }
        }
    });
    toDoRevalidate({ email, year, month, day });
}

export async function getToDos(email: string, year: number, month: number, day: number) {
    const toDos = await db.toDo.findMany({
        where: {
            year,
            month,
            day,
            user: {
                email
            }
        },
        orderBy: {
            created_at: "asc"
        }
    });

    return toDos;
}

export async function getToDo(email: string, id: number) {
    const toDo = await db.toDo.findUnique({
        where: {
            id,
            user: {
                email
            }
        }
    });

    return toDo;
}

export const deleteToDo = async (id: number, year: number, month: number, day: number) => {
    const email = await findUserEmail();
    await db.toDo.delete({
        where: {
            id
        }
    });
    toDoRevalidate({ email, year, month, day });
    revalidateTag(`${id}`);
}

export const completeToDo = async (id: number, year: number, month: number, day: number, isComplete: boolean) => {
    const email = await findUserEmail();
    await db.toDo.update({
        where: {
            id
        },
        data: {
            isComplete: !isComplete
        }
    });

    toDoRevalidate({ email, year, month, day });
    revalidateTag(`${id}`);
}