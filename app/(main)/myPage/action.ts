"use server"

import db from "@/app/lib/db"
import getSession from "@/app/lib/session"
import { redirect } from "next/navigation";

export const getUserInfo = async () => {
    const session = await getSession();
    const user = await db.user.findUnique({
        where: {
            id: session.id
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