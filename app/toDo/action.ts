"use server"

import { revalidateTag } from "next/cache";
import db from "../lib/db"
import getSession from "../lib/session"

export async function addToDo(prev: any, formData: FormData) {
    const session = await getSession();
    await db.toDo.create({
        data: {
            title: formData.get("title")!.toString().trim(),
            description: formData.get("description")!.toString(),
            user: {
                connect: {
                    id: session.id
                }
            }
        }
    });
    revalidateTag(`toDos-${session.id}`);
}

export async function getToDos(userId: number) {
    const toDos = await db.toDo.findMany({
        where: {
            user: {
                id: userId
            }
        }
    });

    return toDos;
}