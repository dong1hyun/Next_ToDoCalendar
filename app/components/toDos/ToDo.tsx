import { motion } from 'framer-motion';
import { FcTodoList } from "react-icons/fc";
import { formatToTimeAgo } from "../../lib/util";
import { toDosForm } from "@/app/lib/type";
import { memo } from "react";
import toDoStore from "@/app/lib/ToDoStore";
import { useRouter } from 'next/navigation';

interface Props {
    toDo: toDosForm
}

const ToDo = memo(({ toDo }: Props) => {
    const { curToDoId, setOpenToDoId } = toDoStore();
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

    return (
        <motion.div
            style={{ opacity: toDo.isComplete ? 0.5 : 1 }}
            transition={{ duration: 0.5 }}
            className={`hover:scale-105 cursor-pointer relative shadow-2xl p-5 h-[150px] overflow-hidden 
            rounded-xl bg-white text-center w-[300px] sm:min-w-[250px] md:min-w-[300px] transition-transform duration-150`}
            onClick={() => setOpenToDoId(toDo.id)}
        >
            <div className="flex flex-col gap-3 relative">
                <div className="absolute flex items-center gap-1 opacity-65"><FcTodoList className="size-5" />{toDo.type}</div>
                <h1 className={`${toDo.isComplete && "line-through"}`}>{toDo.title}</h1>
                <div className="border border-b" />
                <div className="overflow-hidden text-ellipsis whitespace-normal break-words"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // line-clamp 속성
                        WebkitBoxOrient: 'vertical', // 수직 정렬
                    }}>
                    {toDo.description}
                </div>
            </div>
            <div className="absolute left-0 bottom-0 p-1 text-xs font-bold">
                {toDo.id === curToDoId ? "진행중" : `${setTime(toDo.duration)} 진행`}
            </div>
            <div className="absolute right-0 bottom-0 p-1 text-xs font-bold opacity-65">{formatToTimeAgo(toDo.created_at.toString())}</div>
        </motion.div>
    );
});

ToDo.displayName = "ToDo";

export default ToDo;