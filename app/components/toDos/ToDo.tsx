import { completeToDo, deleteToDo } from "../../(main)/toDos/[...date]/action";
import { RiCloseFill } from "react-icons/ri";
import { motion } from 'framer-motion';
import { FcTodoList } from "react-icons/fc";
import { formatToTimeAgo } from "../../lib/util";
import { FaPlayCircle } from "react-icons/fa";
import { toDosForm } from "@/app/lib/type";
import { memo, useCallback } from "react";
import toDoStore from "@/app/lib/ToDoStore";

interface Props {
    toDo: toDosForm
    year: number
    month: number
    day: number
}

const ToDo = memo(({ toDo, year, month, day }: Props) => {
    const { curToDoId, setCurToDo, intervalId, setDuration } = toDoStore();
    const watchTarget = [toDo, year, month, day];

    const setTime = (time: number) => {
        const second = Math.floor(time / 1000);
        const minutes = Math.floor(second / 60);
        const hour = Math.floor(minutes / 60);
        if (second < 60) return ("1분 미만");
        else if (second < 60 * 60) {
            return (`${minutes}분`);
        } else {
            return (`${hour}시간 ${minutes % 60}분`);
        }
    }
    const onPlayClick = useCallback(() => {
        setCurToDo(toDo.id, toDo.title, year, month, day);
    }, watchTarget);

    const stopTimer = useCallback(() => {
        setCurToDo(0, "없음", 0, 0, 0);
        setDuration("");
        clearInterval(intervalId);
    }, []);

    const onCompleteClick = useCallback(() => {
        if (toDo.id === curToDoId) stopTimer();
        completeToDo(toDo.id, year, month, day, toDo.isComplete);
    }, [...watchTarget, curToDoId]);

    const onDeleteClick = useCallback((id: number, year: number, month: number, day: number) => {
        if (id === curToDoId) stopTimer();
        deleteToDo(id, year, month, day);
    }, [curToDoId]);

    return (
        <motion.div
            style={{ opacity: toDo.isComplete ? 0.5 : 1 }}
            transition={{ duration: 0.5 }} className={`relative shadow-2xl p-5 pb-2 rounded-xl
                            bg-white text-center w-[300px] sm:min-w-[350px] md:min-w-[400px]`}>
            <button onClick={() => onDeleteClick(toDo.id, year, month, day)} className="absolute right-1 top-1"><RiCloseFill /></button>
            <div className="flex flex-col gap-3 relative">
                <div className="absolute flex items-center gap-1 opacity-65"><FcTodoList className="size-5" />{toDo.type}</div>
                <h1 className={`${toDo.isComplete && "line-through"}`}>{toDo.title}</h1>
                <div className="border border-b -1 break-words" />
                <div className="break-words">{toDo.description}</div>
            </div>
            <div className="absolute left-0 bottom-0 p-1 text-xs font-bold">
                {toDo.id === curToDoId ? "진행중" : `${setTime(toDo.duration)} 진행`}
            </div>
            <button onClick={onCompleteClick}
                className={`${toDo.isComplete ? "bg-red-500" : "bg-blue-500"} 
                        rounded-md mt-5 px-2 text-white hover:scale-125 transition duration-200`}>
                {toDo.isComplete ? "취소" : "완료"}
            </button>
            {toDo.isComplete ? null : <button onClick={onPlayClick}><FaPlayCircle className="absolute right-2 top-1/2 size-5" /></button>}
            <div className="absolute right-0 bottom-0 p-1 text-xs font-bold opacity-65">{formatToTimeAgo(toDo.created_at.toString())}</div>
        </motion.div>
    );
});

export default ToDo;