"use client"

import { useFormState } from "react-dom";
import { addToDo } from "../toDo/action";
import { IoIosBackspace } from "react-icons/io";
import { useState } from "react";
import { inputForm } from "./auth";
import { PlusIcon } from "@heroicons/react/16/solid";

export default function AddToDos() {
    const [showPopUp, setShowPopUp] = useState(false);
    const [state, action] = useFormState(addToDo, null);
    return (
        <>
            <form
                action={action}
                className={`relative flex flex-col gap-3 w-full max-w-[400px] mt-36 p-5 pt-8 rounded-md 
                        bg-white transition-all duration-300 ease-in-out transform shadow-2xl ${showPopUp ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                <IoIosBackspace onClick={() => setShowPopUp(false)} className="absolute right-2 top-2 size-5 cursor-pointer" />
                {showPopUp && (
                    <>
                        <input placeholder="제목" name="title" required className={inputForm} />
                        <input placeholder="할 일" name="description" required className={`h-20 ${inputForm}`} />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-600 rounded-md py-1">완료</button>
                    </>
                )}
            </form>
            <PlusIcon
                onClick={() => setShowPopUp(true)}
                className="absolute size-10 rounded-full bg-blue-500 right-5 bottom-5 hover:scale-125 transition duration-200 cursor-pointer"
            />
        </>
    )
}