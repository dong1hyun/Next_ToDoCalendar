"use client"

import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function ToDo() {
    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div className="flex flex-col items-center px-2">
            <form
                className={`bg-neutral-500 flex flex-col gap-3 w-full max-w-[400px] mt-36 p-2 rounded-md transition-all duration-300 ease-in-out transform ${
                    showPopUp ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
                {showPopUp && (
                    <>
                        <input placeholder="제목" />
                        <input placeholder="할 일" className="h-20" />
                        <button className="bg-blue-500">완료</button>
                    </>
                )}
            </form>
            <PlusIcon
                onClick={() => setShowPopUp(true)}
                className="absolute size-10 rounded-full bg-blue-500 right-5 bottom-5 hover:scale-125 transition duration-200 cursor-pointer"
            />
        </div>
    );
}
