"use client"

import { useState } from "react";

export function Calendar() {
    const date = new Date();
    const [curDate, setCurDate] = useState<Date>(new Date(date.getFullYear(), date.getMonth(), 1));
    const createCalendar = (choosenDate: Date) => {
        const curYear = choosenDate.getFullYear();
        const curMonth = choosenDate.getMonth();
        const prevMonthLD = new Date(curYear, curMonth, 0).getDate(); //지난 달의 마지막 날
        const curMonthLD = new Date(curYear, curMonth + 1, 0).getDate() //현재달의 마지막 마지막 날
        const startDow = choosenDate.getDay();
        let calendar = [];
        for (let i = prevMonthLD - startDow + 1; i <= prevMonthLD; i++) calendar.push(i);
        for (let i = 1; i <= curMonthLD; i++) calendar.push(i);
        let i = 1;
        while (true) {
            calendar.push(i++);
            if (calendar.length == 42) break;
        }

        return calendar
    }

    return <div>
        <div className="bg-cyan-400 h-screen w-[600px] m-auto">
            <div className="flex justify-between gap-5 px-10">
                <span>일</span>
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span>토</span>
            </div>
            <div className="grid grid-cols-7 grid-rows-7 gap-2">
                {createCalendar(curDate).map((day, i) => <div>{day}</div>)}
            </div>
        </div>
    </div>
}