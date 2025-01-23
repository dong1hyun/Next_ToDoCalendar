import { Metadata } from "next";

export const metadata: Metadata = {
    title: "toDoCalendar에 오신것을 환영합니다.",
    description: "개인 일정 관리와 작업 추적을 위한 캘린더",
    keywords: "일정, 달력, 관리, 작업",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}
