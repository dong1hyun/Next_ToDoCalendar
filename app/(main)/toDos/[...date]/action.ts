"use server"

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { revalidateTag } from "next/cache";
import { findUser } from "../../home/[...date]/page";
import { getServerSession } from "next-auth";
import curToDo_store from "@/app/lib/curToDo_store";

export interface formData {
    title: string,
    description: string,
    type: string
}

export const find_userId = async () => {
    const session = await getSession();
    const data = await getServerSession();
    const google_email = data?.user?.email;
    if (session.id) return session.id
    if (google_email) {
        const google_user = await db.user.findUnique({
            where: {
                email: google_email
            },
            select: {
                id: true
            }
        });

        return google_user?.id;
    }
}

export async function addToDo(toDo: formData, year: number, month: number, day: number) {
    const id = await find_userId();
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
                    id
                }
            }
        }
    });
    revalidateTag(`toDos-${year}-${month}-${day}`);
}

export async function getToDos(user: { id?: number, email?: string }, year: number, month: number, day: number) {
    // const user2 = await findUser();
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
    const session = await getSession();
    await db.toDo.delete({
        where: {
            id
        }
    });
    revalidateTag(`toDos-${year}-${month}-${day}`);
}

export const completeToDo = async (id: number, year: number, month: number, day: number) => {
    "use server"
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
    
    revalidateTag(`toDos-${year}-${month}-${day}`);
}