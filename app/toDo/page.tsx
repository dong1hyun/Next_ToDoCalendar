"use server"

import { getToDos } from "./action";
import AddToDos from "../component/addToDo";
import { unstable_cache as nextCache } from "next/cache";
import getSession from "../lib/session";

export default async function ToDo() {
    const session = await getSession();
    const getCachedToDos = nextCache(getToDos, [`toDos-${session.id}`], { tags: [`toDos-${session.id}`] });
    const toDos = await getCachedToDos(session.id!);
    return (
        <div className="flex flex-col items-center px-5">
            {toDos.map((toDo) => <div className="flex flex-col gap-3">{toDo.title}</div>)}
            <AddToDos />
        </div>
    );
}
