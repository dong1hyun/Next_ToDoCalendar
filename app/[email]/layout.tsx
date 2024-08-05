import { redirect } from "next/navigation";
import BackToCalendar from "../component/backToCalendar";

export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex flex-col items-center">
        <div className="fixed top-0 z-20 flex justify-between items-center bg-[#5352ed] h-14 w-full">
            <BackToCalendar />
            <div>
                마이페이지
            </div>
        </div>
        <div className="h-10 xl:h-0" />
        {children}
    </div>
}