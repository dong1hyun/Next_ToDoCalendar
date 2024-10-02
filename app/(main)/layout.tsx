"use client"

import { useRouter } from "next/navigation";
import BackToCalendar from "../components/backToCalendar";
import CurToDo from "../components/CurToDo";
import useCurToDoStore from "../lib/curToDo_store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center">
            <div className="font-dh z-20 flex justify-between items-center bg-neutral-300 h-14 w-full pr-5">
                <BackToCalendar />
                <div className="flex-grow" />
                <CurToDo />
                <button onClick={() => router.push("/myPage")} className="bg-orange-500 px-1 rounded-md mx-5 hover:scale-110 transition-transform duration-200">
                    마이페이지
                </button>
            </div>
            {children}
        </div>
    );
}
