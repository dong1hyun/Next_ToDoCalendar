"use client";

import { useState } from "react";
import { IoIosBackspace } from "react-icons/io";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { addToDo, formData } from "../[email]/toDos/[...date]/action";
import { inputForm } from "./auth";

export default function AddToDos() {
    const { date } = useParams();
    const [showPopUp, setShowPopUp] = useState(false);
    const { register, handleSubmit, reset } = useForm<formData>();
    
    const onValid = async (data: formData) => {
        setShowPopUp(false);
        reset();
        await addToDo(data, new Date(+date[0], +date[1] - 1, +date[2] + 1));
    }
    
    return (
        <>
            <form
                onSubmit={handleSubmit(onValid)}
                className={`fixed flex flex-col gap-3 w-full border-2 max-w-[280px] 
                    md:max-w-[500px] mt-40 p-5 pt-8 rounded-md
                        bg-white transition-all duration-300 ease-in-out transform shadow-2xl mx-auto
                        ${showPopUp ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                <IoIosBackspace onClick={() => setShowPopUp(false)} className="absolute right-2 top-2 size-5 cursor-pointer" />
                {showPopUp && (
                    <>
                        <input placeholder="제목" {...register("title")} required className={inputForm} />
                        <input placeholder="할 일" {...register("description")} required className={`h-20 ${inputForm}`} />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-600 rounded-md py-1">완료</button>
                    </>
                )}
            </form>
            <PlusIcon
                onClick={() => setShowPopUp(true)}
                className="fixed size-10 rounded-full bg-blue-500 right-5 bottom-5 hover:scale-125 transition duration-200 cursor-pointer"
            />
        </>
    )
}
