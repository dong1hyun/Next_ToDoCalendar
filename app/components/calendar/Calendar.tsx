"use client"

import { useParams } from "next/navigation";
import SelectedMonth from "./SelectedMonth";
import Days from "./Days";
import SearchBar from "./SearchBar";
import ToDoSearchResult from "./ToDoSearchResult";
import { getToDos } from "@/app/(main)/toDos/[...date]/action";
import { getCounts } from "@/app/(main)/home/[...date]/action";

interface Props {
    toDoCount: number[]
    completeCount: number[]
}

export function Calendar({ toDoCount, completeCount }: Props) {
    const { date } = useParams<{ date: string[] }>();
    const year = +date[0];
    const month = +date[1] - 1;

    return (
        <div className="bg-white p-4 rounded-lg shadow-2xl w-[330px] sm:w-[450px] md:w-[600px] mt-12 xl:mt-32">
            <ToDoSearchResult />
            <div className="flex justify-between">
                <SelectedMonth year={year} month={month} />
                <SearchBar />
            </div>
            <div className="grid grid-cols-7 place-items-center text-sm font-medium text-gray-600 mb-2">
                <span className="text-red-500">SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span className="text-blue-500">SAT</span>
            </div>
            <Days year={year} month={month} toDoCount={toDoCount} completeCount={completeCount} />
        </div>
    );
}