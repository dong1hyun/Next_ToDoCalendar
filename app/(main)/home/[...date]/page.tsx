"use server"

import { Calendar } from "../../../components/calendar";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";
import MyResponsivePie from "@/app/components/Chart";
import { getServerSession } from "next-auth";

interface urlForm {
    params: {
        date: string[];
    }
}

export const findUser = async () => {
    const session = await getSession();
    const data = await getServerSession();
    const google_email = data?.user?.email;
    const exist_info: {id?: number; email?: string} = {};
    if(session.id) exist_info.id = session.id;
    if(google_email) exist_info.email = google_email;
    return exist_info;
}

// const getToDoCount = async (year: number, month: number, day: number, user: any) => {
//     console.log("day:", day);
//     const count = await db.toDo.count({
//         where: {
//             year,
//             month,
//             day,
//             isComplete: false,
//             user
//         }
//     });
//     return count;
// }

// const getCompleteCount = async (year: number, month: number, day: number, user: any) => {
//     const count = await db.toDo.count({
//         where: {
//             year,
//             month,
//             day,
//             isComplete: true,
//             user
//         }
//     });
//     return count;
// }

export const getTypeCount = async (type: string, year: number, month: number ,isComplete: boolean) => {
    const user = await findUser();
    const count = await db.toDo.count({
        where: {
            type,
            year,
            month,
            isComplete,
            user
        }
    });
    return count;
}

export default async function Home({ params }: urlForm) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const year = +params.date[0];
    const month = +params.date[1];
    const limit = new Date(year, month, 0).getDate();
    const toDoCount: number[] = Array(limit).fill(0);
    const completeCount: number[] = Array(limit).fill(0);
    const typeCount = {
        work: 0,
        friend: 0,
        individual: 0,
        education: 0,
        social: 0
    }
    const user = await findUser();
    console.log("월, 달", year, month);
    console.log("limit", limit);
    try {
        const counts = await db.toDo.findMany({
            where: {
                year,
                month,
                user,
            },
        });
        counts.forEach((item) => {
            if (item.isComplete) {
                completeCount[item.day - 1]++;
            } else {
                toDoCount[item.day - 1]++;
            }
        });
        console.log("result: ", toDoCount, completeCount);
    } catch (error) {
        console.error("toDo count 에러:", error);
    }

    try {
        const counts = await db.toDo.findMany({
            where: {
                year,
                month,
                isComplete: false,
                user
            }
        });
        console.log(counts);
        counts.forEach((item) => {
            if(item.type == "업무") {
                typeCount.work++;
            } else if(item.type == "지인") {
                typeCount.friend++;
            } else if(item.type == "개인") {
                typeCount.individual++;
            } else if(item.type == "교육") {
                typeCount.education++;
            } else {
                typeCount.social++;
            }
        })
    } catch(error) {
        console.error("type count 에러:", error);
    }
    // const work = await getTypeCount("업무", year, month, false);
    // const friend = await getTypeCount("지인", year, month, false);
    // const individual = await getTypeCount("개인", year, month, false);
    // const education = await getTypeCount("교육", year, month, false);
    // const social = await getTypeCount("사회활동", year, month, false);
    const data = [
        {
            "id": "업무",
            "label": "업무",
            "value": typeCount.work,
        },
        {
            "id": "지인",
            "label": "지인",
            "value": typeCount.friend,
        },
        {
            "id": "개인",
            "label": "개인",
            "value": typeCount.individual,
        },
        {
            "id": "교육",
            "label": "교육",
            "value": typeCount.education,
        },
        {
            "id": "사회활동",
            "label": "사회활동",
            "value": typeCount.social,
        },
    ]
    return (
        <div className="h-screen flex flex-col xl:flex-row justify-center items-center pt-24 xl:pt-0">
            <Calendar toDoCount={toDoCount} completeCount={completeCount} />
            <div className="flex flex-col items-center mt-6">
                <h1 className="text-xl font-bold">당월 할 일 차트</h1>
                <div className="w-80 h-80">
                    <MyResponsivePie data={data} colors={['#c56cf0', '#706fd3', '#34ace0', '#ff793f', '#e74c3c']} />
                </div>
            </div>
        </div>
    )
}