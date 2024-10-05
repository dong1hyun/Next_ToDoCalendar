"use client"

import { useRouter } from "next/navigation";
import BackToCalendar from "../components/backToCalendar";
import CurToDo from "../components/CurToDo";
import useCurToDoStore from "../lib/curToDo_store";
import { buttonStyle } from "../lib/css";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center">
            <div className="font-dh z-20 flex justify-between items-center bg-gradient-to-r from-blue-200 via-fuchsia-100 to-blue-200 h-14 w-full pr-5">
                <BackToCalendar />
                <div className="flex-grow" />
                <CurToDo />
                <button onClick={() => router.push("/myPage")} className={`${buttonStyle} bg-black px-4 py-2 ml-3`}>
                    마이페이지
                </button>
            </div>
            {children}
        </div>
    );
}
