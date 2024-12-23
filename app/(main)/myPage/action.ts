"use server"

import db from "@/app/lib/db"
import getSession from "@/app/lib/session"
import { redirect } from "next/navigation";
import { findUserEmail } from "@/app/lib/serverUtil";

export const getUserInfo = async () => {
    const email = await findUserEmail();
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            username: true,
            email: true
        }
    });

    return user;
}

export const logOut = async () => {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}

export const getMypageTypeCount = async (email: string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const count = await db.toDo.findMany({
        where: {
            year,
            month,
            isComplete: true,
            userEmail: email
        }
    });
    return count;
}