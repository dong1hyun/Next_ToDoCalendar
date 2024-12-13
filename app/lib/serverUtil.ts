"use server"

import { getServerSession } from "next-auth";
import getSession from "./session";
import db from "./db";
import { revalidateTag } from "next/cache";
import { ToDoRevalidateType } from "./type";
export const findUser = async () => {
    const session = await getSession();
    const data = await getServerSession();
    const google_email = data?.user?.email;
    const exist_info: { id?: number; email?: string } = {};
    if (session.id) exist_info.id = session.id;
    if (google_email) exist_info.email = google_email;
    return exist_info;
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

export const toDoRevalidate = ({ userId, year, month, day }: ToDoRevalidateType) => {
    revalidateTag(`${userId}-${year}-${month}-${day}`);
    revalidateTag(`${userId}-${year}-${month}`);
    revalidateTag(`${userId}`);
}