"use client"

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function BackToCalendar() {
    const router = useRouter();
    const onBackClick = () => {
        router.back();
    }
    return <IoMdArrowBack className="m-5 size-10 cursor-pointer" onClick={onBackClick} />
}