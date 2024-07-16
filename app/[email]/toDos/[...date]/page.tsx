"use server"

import getSession from "@/app/lib/session";
import { getToDos } from "./action";
import { unstable_cache as nextCache } from "next/cache";
import AddToDos from "@/app/component/addToDo";
import { useParams } from "next/navigation";

interface paramsForm {
    params: {
        email: string
        date: string[]
    }
}

export default async function ToDos({params}: paramsForm) {
    const date = params.date;
    const session = await getSession();
    const getCachedToDos = nextCache(getToDos, [`toDos-${session.id}`], { tags: [`toDos-${session.id}`] });
    const toDos = await getCachedToDos(session.id!, new Date(+date[0], +date[1] - 1, +date[2] + 1));
    return (
        <div>
            <div className="flex flex-col items-center px-5">
                <h1 className="text-3xl mt-10">{+date[1]}월 {date[2]}일</h1>
                {toDos.map((toDo, i) => <div key={i} className="flex flex-col gap-3">{toDo.title}</div>)}
                <AddToDos />
            </div>
        </div>
    );
}