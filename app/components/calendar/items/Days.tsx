"use client"

import { memo, useMemo } from "react";
import { onDayClick } from "../../../(main)/home/[...date]/action";
import { density } from "../../../lib/util";

interface Props {
    year: number
    month: number
    toDoCount: number[]
    completeCount: number[]
}

const Days = memo(({ year, month, completeCount, toDoCount }: Props) => {
    const limit = new Date(year, month + 1, 0).getDate();

    const [prevMonthLD, curMonthLD, startDow] = useMemo(() => {
        const prevMonthLD = new Date(year, month, 0).getDate(); // 지난 달의 마지막 날
        const curMonthLD = new Date(year, month + 1, 0).getDate(); // 현재 달의 마지막 날
        const startDow = new Date(year, month).getDay();

        return [prevMonthLD, curMonthLD, startDow];
    }, [year, month]);

    const days = useMemo(() => {
        let calendar = [];
        for (let i = prevMonthLD - startDow + 1; i <= prevMonthLD; i++) calendar.push(i); // 이전 달의 날짜
        for (let i = 1; i <= curMonthLD; i++) calendar.push(i); // 현재 달의 날짜
        let i = 1;
        while (calendar.length < 42) { // 다음 달의 날짜
            calendar.push(i++);
        }
        return calendar;
    }, [prevMonthLD, curMonthLD, startDow]);

    return (
        <div className={`grid grid-cols-7 grid-rows-6 place-items-center gap-2 text-center transition-opacity duration-200`}>
            {days.map((day, i) => {
                const notThisMonth = (day > 20 && i < 15) || (day < 15 && i > 20);
                return (
                    <div
                        onClick={() => {
                            onDayClick(year, month + 1, day, notThisMonth);
                        }}
                        key={i}
                        className={`
                                relative
                                ${startDow <= i && i - startDow < limit ? density(completeCount[i - startDow]) : null}
                                hover:opacity-60
                                rounded-md
                                ${notThisMonth ? null : "cursor-pointer"}  
                                p-2
                                ${day > 20 && i < 15 ? "opacity-50" : ""}
                                ${day < 15 && i > 20 ? "opacity-50" : ""}
                                ${i % 7 === 0 ? "text-red-500" : ""}
                                ${i % 7 === 6 ? "text-blue-500" : ""}
                                `}
                    >
                        {startDow <= i && i - startDow < limit && toDoCount[i - startDow] !== 0 && <div className="absolute bg-blue-500 rounded-full right-0 top-0 size-2" />}
                        {day}
                    </div>
                )
            })}
        </div>
    )
});

Days.displayName = "Days";

export default Days;