"use client"

import { useRouter } from "next/navigation";
import BackToCalendar from "../components/backToCalendar";
import CurToDo from "../components/CurToDo";
import useCurToDoStore from "../lib/curToDo_store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center">
            <div className="font-dh fixed top-0 z-20 flex justify-between items-center bg-neutral-300 h-14 w-full pr-5">
                <BackToCalendar />
                <div className="flex-grow" />
                <button onClick={() => router.push("/myPage")} className="mx-5">
                    마이페이지
                </button>
                <CurToDo />
            </div>
            {children}
        </div>
    );
}
