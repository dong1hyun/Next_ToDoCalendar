"use server"

import getSession from "@/app/lib/session";
import { getToDos } from "./action";
import { unstable_cache as nextCache } from "next/cache";
import AddToDos from "@/app/component/addToDo";

export default async function ToDos() {
    const session = await getSession();
    const getCachedToDos = nextCache(getToDos, [`toDos-${session.id}`], { tags: [`toDos-${session.id}`] });
    const toDos = await getCachedToDos(session.id!);
    return (
        <div>
            <div className="flex flex-col items-center px-5">
                {toDos.map((toDo, i) => <div key={i} className="flex flex-col gap-3">{toDo.title}</div>)}
                <AddToDos />
            </div>
        </div>
    );
}