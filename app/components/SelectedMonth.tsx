import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import styled from "styled-components";


const selectInputStyle = "bg-neutral-300 rounded-md px-2 w-16 md:w-24 text-sm"

const SelectDate = styled(motion.form)`
    z-index: 10;
    top: 0;
    display: flex;
    gap: 5px;
`
interface IForm {
    year: number,
    month: number
}

interface Props {
    year: number
    month: number
}

const SelectedMonth = ({year, month}: Props) => {
    const router = useRouter();
    const [showDate, setShowDate] = useState(false);
    const { register, handleSubmit } = useForm<IForm>();

    const handleMonthChange = useCallback((offset: number) => {
        const newDate = new Date(year, month + offset);
        router.push(`/home/${newDate.getFullYear()}/${newDate.getMonth() + 1}`);
    }, []);

    const onValid = useCallback((data: IForm) => {
        if (data.year < 2000 || data.year > 2100) alert("연도가 범위를 벗어났습니다");
        else if (data.month < 1 || data.month > 12) alert("월이 범위를 벗어났습니다.")
        else {
            setShowDate(false);
            router.push(`/home/${data.year}/${data.month}`);
        }
    }, [])

    return (
        <div className="text-center text-xl font-bold mb-4 flex justify-center items-center">
            {showDate ? (
                <SelectDate
                    onSubmit={handleSubmit(onValid)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <input type="number" defaultValue={year} {...register("year")} className={selectInputStyle} placeholder="연도" />
                    <input type="number" defaultValue={month + 1} {...register("month")} className={selectInputStyle} placeholder="월" />
                    <button className="bg-blue-500 rounded-md px-2 text-sm">확인</button>
                </SelectDate>
            ) :
                <>
                    <span onClick={() => setShowDate(true)} className="hover:bg-gray-300 rounded-md cursor-pointer px-5">
                        {year}년 {month + 1}월
                    </span>
                    <div className="flex flex-col items-center *:rounded-md">
                        <IoMdArrowDropup
                            onClick={() => handleMonthChange(-1)}
                            className="hover:bg-gray-300 cursor-pointer"
                        />
                        <IoMdArrowDropdown
                            onClick={() => handleMonthChange(1)}
                            className="hover:bg-gray-300 cursor-pointer"
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default SelectedMonth;