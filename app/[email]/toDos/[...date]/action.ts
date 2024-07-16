"use server"

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { revalidateTag } from "next/cache";

export interface formData{
    title: string,
    description: string
}

export async function addToDo(data: formData, date: Date) {
    const session = await getSession();
    await db.toDo.create({
        data: {
            title: data.title,
            description: data.description,
            date: date,
            user: {
                connect: {
                    id: session.id
                }
            }
        }
    });
    revalidateTag(`toDos-${session.id}`);
}

export async function getToDos(userId: number, date: Date) {
    console.log(date)
    const toDos = await db.toDo.findMany({
        where: {
            date: date,
            user: {
                id: userId
            }
        }
    });

    return toDos;
}