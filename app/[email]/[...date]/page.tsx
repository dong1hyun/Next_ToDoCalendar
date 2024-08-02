"use server"

import { useState } from "react";
import { Calendar } from "../../component/calendar";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";
import MyResponsivePie from "@/app/component/Chart";

interface urlForm {
    params: {
        email: string
        date: string[]
    }
}

const getToDoCount = async (year: number, month: number, day: number) => {
    const session = await getSession();
    const count = await db.toDo.count({
        where: {
            year,
            month,
            day,
            user: {
                id: session.id
            }
        }
    });

    return count;
}

const getTypeCount = async (type: string, year: number, month: number) => {
    const count = await db.toDo.count({
        where: {
            type,
            year,
            month
        }
    });

    return count
}

export default async function home({ params }: urlForm) {
    const year = +params.date[0];
    const month = +params.date[1];
    const limit = new Date(year, month + 1, 0).getDate();
    const toDoCount: number[] = [];
    for (let i = 1; i <= limit; i++) {
        const count = await getToDoCount(year, month, i);
        toDoCount.push(count);
    }
    const work = await getTypeCount("업무", year, month);
    const friend = await getTypeCount("지인", year, month);
    const individual = await getTypeCount("개인", year, month);
    const education = await getTypeCount("교육", year, month);
    const social = await getTypeCount("사회활동", year, month);
    console.log(work);
    const data = [
        {
            "id": "업무",
            "label": "업무",
            "value": work,
        },
        {
            "id": "지인",
            "label": "지인",
            "value": friend,
        },
        {
            "id": "개인",
            "label": "개인",
            "value": individual,
        },
        {
            "id": "교육",
            "label": "교육",
            "value": education,
        },
        {
            "id": "사회활동",
            "label": "사회활동",
            "value": social,
        },
    ]
    return (
        <div className="h-screen flex flex-col xl:flex-row justify-center items-center">
            <Calendar toDoCount={toDoCount} />
            <div className="flex flex-col items-center mt-6">
                <h1 className="text-xl font-bold">당월 할 일 차트</h1>
                <div className="w-80 h-80">
                    <MyResponsivePie data={data} />
                </div>
            </div>
        </div>
    )
}