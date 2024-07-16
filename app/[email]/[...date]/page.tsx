"use server"

import { useState } from "react";
import { Calendar } from "../../component/calendar";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";

interface urlForm {
    params: {
        email: string
        date: string[]
    }
}

const getToDoCount = async (year: number, month:number, day: number) => {
    const session = await getSession();
    const count = await db.toDo.count({
        where: {    
            date: new Date(year, month, day + 1),
            user: {
                id: session.id
            }
        }
    });

    return count;
}

export default async function home({params}: urlForm) {
    const year = +params.date[0];
    const month = +params.date[1];
    const limit = new Date(year, month + 1, 0).getDate();
    const toDoCount:number [] = [];
    for(let i = 1; i <= limit; i++) {
        const count = await getToDoCount(year, month - 1, i);
        toDoCount.push(count);
    }
    return (
        <Calendar toDoCount={toDoCount} />
    )
}