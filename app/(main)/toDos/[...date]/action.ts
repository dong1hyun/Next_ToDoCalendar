"use server"

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { revalidateTag } from "next/cache";

export interface formData{
    title: string,
    description: string,
    type: string
}

export async function addToDo(toDo: formData, year: number, month: number, day: number) {
    const session = await getSession();
    await db.toDo.create({
        data: {
            title: toDo.title,
            description: toDo.description,
            type: toDo.type,
            year,
            month,
            day,
            user: {
                connect: {
                    id: session.id
                }
            }
        }
    });
    revalidateTag(`toDos-${session.id}`);
}

export async function getToDos(userId: number, year: number, month: number, day: number) {
    const toDos = await db.toDo.findMany({
        where: {
            year,
            month,
            day,
            user: {
                id: userId
            }
        },
        orderBy: {
            created_at: "asc"
        }
    });

    return toDos;
}

export const deleteToDo = async (id: number) => {
    "use server"
    const session = await getSession();
    await db.toDo.delete({
        where: {
            id
        }
    });
    revalidateTag(`toDos-${session.id}`);
}

export const completeToDo = async (id: number) => {
    "use server"
    const session = await getSession();
    const toDo = await db.toDo.findUnique({
        where: {
            id
        },
        select: {
            isComplete: true
        }
    });
    await db.toDo.update({
        where: {
            id
        },
        data: {
            isComplete: !toDo?.isComplete
        }
    });

    revalidateTag(`toDos-${session.id}`);
}