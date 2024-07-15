"use server"

import { redirect } from "next/navigation";

export async function onDayClick(email: string, year: number, month: number, day: number) {
    redirect(`/${email}/toDos/${year}/${month}/${day}`);
}