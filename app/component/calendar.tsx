"use client"

import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export function Calendar() {
    const date = new Date();
    const [curDate, setCurDate] = useState<Date>(new Date(date.getFullYear(), date.getMonth(), 1));
    const [fade, setFade] = useState<boolean>(false);

    const createCalendar = (choosenDate: Date) => {
        const curYear = choosenDate.getFullYear();
        const curMonth = choosenDate.getMonth();
        const prevMonthLD = new Date(curYear, curMonth, 0).getDate(); // 지난 달의 마지막 날
        const curMonthLD = new Date(curYear, curMonth + 1, 0).getDate(); // 현재 달의 마지막 날
        const startDow = choosenDate.getDay();
        let calendar = [];
        for (let i = prevMonthLD - startDow + 1; i <= prevMonthLD; i++) calendar.push(i); // 이전 달의 날짜
        for (let i = 1; i <= curMonthLD; i++) calendar.push(i); // 현재 달의 날짜
        let i = 1;
        while (calendar.length < 42) { // 다음 달의 날짜
            calendar.push(i++);
        }

        return calendar;
    }

    const onYMClick = () => {

    }

    const handleMonthChange = (offset: number) => {
        setFade(true);
        setTimeout(() => {
            setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + offset));
            setFade(false);
        }, 300); // 트랜지션 지속 시간과 일치하게 설정
    };

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[600px]">
                <div className="text-center text-xl font-bold mb-4 flex justify-center items-center">
                    <span  className="hover:bg-gray-300 rounded-md cursor-pointer px-5">
                        {curDate.getFullYear()}년 {curDate.getMonth() + 1}월
                    </span>
                    <div className="flex flex-col items-center *:rounded-md">
                        <IoMdArrowDropup 
                            onClick={() => handleMonthChange(1)} 
                            className="hover:bg-gray-300 cursor-pointer" 
                        />
                        <IoMdArrowDropdown 
                            onClick={() => handleMonthChange(-1)} 
                            className="hover:bg-gray-300 cursor-pointer" 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
                    <span className="text-red-500">SUN</span>
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span className="text-blue-500">SAT</span>
                </div>
                <div className={`grid grid-cols-7 grid-rows-6 gap-2 text-center transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                    {createCalendar(curDate).map((day, i) => (
                        <Link
                            href={"/toDo"}
                            key={i}
                            className={`
                                hover:bg-gray-300
                                rounded-md
                                cursor-pointer
                                p-2
                                ${day > 20 && i < 15 ? "opacity-50" : ""}
                                ${day < 15 && i > 20 ? "opacity-50" : ""}
                                ${i % 7 === 0 ? "text-red-500" : ""}
                                ${i % 7 === 6 ? "text-blue-500" : ""}
                                `}
                        >
                            {day}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
