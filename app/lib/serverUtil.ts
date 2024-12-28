"use server"

import { getServerSession } from "next-auth";
import getSession from "./session";
import { revalidateTag } from 'next/cache';
import { ToDoRevalidateType } from "./type";
export const findUserEmail = async () => {
    const session = await getSession();
    const data = await getServerSession();
    const google_email = data?.user?.email;
    return google_email ? google_email : session.email;
}

export const toDoRevalidate = ({ email, year, month, day }: ToDoRevalidateType) => {
    revalidateTag(`${email}-${year}-${month}-${day}`);
    revalidateTag(`${email}-${year}-${month}`);
    revalidateTag(`${email}`);
}