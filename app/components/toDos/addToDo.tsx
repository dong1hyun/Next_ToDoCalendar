"use client";

import { useState } from "react";
import { IoIosBackspace } from "react-icons/io";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { addToDo, formData } from "../../(main)/toDos/[...date]/action";
import { AnimatePresence, motion } from 'framer-motion';
import { inputForm } from "../Auth";

const Loading = () => (
    <div className="flex flex-row items-start justify-center gap-2 *:w-4 *:h-4 *:rounded-full *:bg-blue-700 *:animate-bounce ">
        <div className=""></div>
        <div className="[animation-delay:-.3s]"></div>
        <div className="[animation-delay:-.5s]"></div>
    </div>
)

export default function AddToDos() {
    const { date } = useParams();
    const [showPopUp, setShowPopUp] = useState(false);
    const [seletedType, setSelectedType] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm<formData>();
    const onValid = async (data: formData) => {
        if(!seletedType) {
            alert("할 일의 종류를 선택해주세요!");
            return;
        }
        setLoading(true);
        reset();
        const toDo = {...data, type: seletedType};
        await addToDo(toDo, +date[0], +date[1], +date[2]);
        setShowPopUp(false);
        setLoading(false);
    }

    function ToDoTypeBtn({ type }: { type: string }) {
        return <button onClick={() => setSelectedType(type)} className={`border border-black px-1 rounded-md font-dh hover:bg-blue-300 ${seletedType === type ? "bg-blue-500" : null}`}>{type}</button>
    }

    return (
        <AnimatePresence>
            {showPopUp ? <motion.form
                key="modal"
                onSubmit={handleSubmit(onValid)}
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`fixed flex flex-col gap-3 w-full border-2 max-w-[360px] 
                    md:max-w-[500px] mt-20 p-5 pt-8 rounded-md
                        bg-white transition-all duration-300 ease-in-out transform shadow-2xl mx-auto
                    }`}
            >
                <IoIosBackspace onClick={() => setShowPopUp(false)} className="absolute right-2 top-2 size-5 cursor-pointer" />
                <input placeholder="제목" {...register("title")} required maxLength={10} className={inputForm} />
                <textarea placeholder="할 일" {...register("description")} required className={`h-20 ${inputForm}`} />
                <div className="flex justify-center">할 일의 종류를 선택해주세요!</div>
                <div className="flex justify-between gap-3 text-sm md:px-10 mb-3">
                    <ToDoTypeBtn type="업무" />
                    <ToDoTypeBtn type="지인" />
                    <ToDoTypeBtn type="개인" />
                    <ToDoTypeBtn type="교육" />
                    <ToDoTypeBtn type="사회활동" />
                </div>
                {
                    loading ? <Loading /> : <button type="submit" className="text-white bg-blue-700 hover:bg-blue-600 rounded-md py-1">완료</button>
                }
            </motion.form> : null}
            <PlusIcon
                onClick={() => setShowPopUp(true)}
                className="fixed size-10 rounded-full bg-blue-500 right-5 bottom-5 hover:scale-125 transition duration-200 cursor-pointer"
            />
        </AnimatePresence>
    )
}
