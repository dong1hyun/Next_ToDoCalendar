"use client"

import { useParams } from "next/navigation";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { onDayClick } from "../[email]/[...date]/action";
import { useRouter } from "next/navigation";

interface urlForm {
    email: string
    date: string[]
}

const density = (count: number) => {
    switch(count) {
        case 0: return ""
        case 1: return "bg-green-200"
        case 2: return "bg-green-300"
        case 3: return "bg-green-400"
        case 4: return "bg-green-500"
        case 5: return "bg-green-600"
        case 6: return "bg-red-200"
        case 7: return "bg-red-300"
        case 8: return "bg-red-400"
        case 9: return "bg-red-500"
        case 10: return "bg-red-600"
        case 11: return "bg-red-700"
        case 12: return "bg-red-800"
        default: return "bg-violet-500"
    }
}

export function Calendar({toDoCount}: {toDoCount: number[]}) {
    const {email, date} = useParams<any>();
    const year = +date[0];
    const month = +date[1] - 1;
    const limit = new Date(year, month + 1, 0).getDate();
    const curDate = new Date(year, month);
    const router = useRouter();
    const prevMonthLD = new Date(year, month, 0).getDate(); // 지난 달의 마지막 날
    const curMonthLD = new Date(year, month + 1, 0).getDate(); // 현재 달의 마지막 날
    const startDow = new Date(year, month).getDay();
    const createCalendar = () => {
        let calendar = [];
        for (let i = prevMonthLD - startDow + 1; i <= prevMonthLD; i++) calendar.push(i); // 이전 달의 날짜
        for (let i = 1; i <= curMonthLD; i++) calendar.push(i); // 현재 달의 날짜
        let i = 1;
        while (calendar.length < 42) { // 다음 달의 날짜
            calendar.push(i++);
        }
        return calendar;
    }

    const handleMonthChange = (offset: number) => {
        const newDate = new Date(year, month + offset);
        router.push(`/${email}/${newDate.getFullYear()}/${newDate.getMonth() + 1}`);
    };

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <div className="bg-white p-4 rounded-lg shadow-2xl w-[600px]">
                <div className="text-center text-xl font-bold mb-4 flex justify-center items-center">
                    <span  className="hover:bg-gray-300 rounded-md cursor-pointer px-5">
                        {year}년 {month + 1}월
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
                <div className={`grid grid-cols-7 grid-rows-6 gap-2 text-center transition-opacity duration-200`}>
                    {createCalendar().map((day, i) => (
                        <div
                            onClick={() => {
                                onDayClick(email, year, month + 1, day);
                            }}
                            key={i}
                            className={`
                                relative
                                ${startDow <= i && i < limit ? density(toDoCount[i-startDow]) : null}
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
                            {/* <div className="absolute text-xs right-1 top-0">{toDoCount[i - startDow] > 0 ? "+" + toDoCount[i - startDow] : null}</div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
