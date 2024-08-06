"use server"

import { redirect } from "next/navigation";

export async function onDayClick(email: string, year: number, month: number, day: number, notThisMonth: boolean) {
    if(notThisMonth) return
    redirect(`/toDos/${year}/${month}/${day}`);
}