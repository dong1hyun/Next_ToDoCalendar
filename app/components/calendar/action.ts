"use server"

import db from "@/app/lib/db";
import { findUserEmail } from "@/app/lib/serverUtil";

export async function getToDoByKeyword(keyword: string, year: number, month: number) {
    const email = await findUserEmail();
    const toDos = await db.toDo.findMany({
        where: {
            year,
            month,
            user: {
                email: email,
            },
            OR: [
                {
                    title: {
                        contains: keyword, // 제목에 키워드 포함 여부
                        mode: 'insensitive', // 대소문자 구분 없음
                    },
                },
                {
                    description: {
                        contains: keyword, // 설명에 키워드 포함 여부
                        mode: 'insensitive',
                    },
                },
                {
                    type: {
                        contains: keyword, // 설명에 키워드 포함 여부
                        mode: 'insensitive',
                    },
                },
            ],
        },
        select: {
            title: true,
            description: true,
            day: true
        },
        orderBy: {
            created_at: 'asc',
        },
    });

    return toDos;
}