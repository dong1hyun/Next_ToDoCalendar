"use client"

import BackToCalendar from "../component/backToCalendar";
import CurToDo from "../component/CurToDo";
import useCurToDoStore from "../lib/curToDo_store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { title, startTime } = useCurToDoStore();
    return (
        <div className="flex flex-col items-center">
            <div className="font-dh fixed top-0 z-20 flex justify-between items-center bg-[#00cec9] h-14 w-full pr-5">
                <BackToCalendar />
                <div>
                    마이페이지
                </div>
                <CurToDo />
            </div>
            {children}
        </div>
    );
}
