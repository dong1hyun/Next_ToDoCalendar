"use server"

import db from "@/app/lib/db";
import { getCountType } from "@/app/lib/type";
import { redirect } from "next/navigation";

export async function onDayClick(year: number, month: number, day: number, notThisMonth: boolean) {
    if(notThisMonth) return;
    redirect(`/toDos/${year}/${month}/${day}`);
}

export async function getCounts({user, year, month}: getCountType) {
    const counts = await db.toDo.findMany({
        where: {
            year,
            month,
            user,
        },
    });

    return counts;
}