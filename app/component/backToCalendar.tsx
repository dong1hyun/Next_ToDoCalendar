"use client"

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function BackToCalendar() {
    const router = useRouter();
    const onBackClick = () => {
        router.back();
    }
    return <IoArrowBackOutline className="m-5 size-10 cursor-pointer" onClick={onBackClick} />
}