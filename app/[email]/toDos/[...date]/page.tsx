import getSession from "@/app/lib/session";
import { getToDos } from "./action";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import AddToDos from "@/app/component/addToDo";
import ToDoList from "@/app/component/toDoList";
import BackToCalendar from "@/app/component/backToCalendar";

interface paramsForm {
  params: {
    email: string
    date: string[]
  }
}

export default async function ToDos({ params }: paramsForm) {
  const date = params.date;
  const session = await getSession();
  const getCachedToDos = nextCache(getToDos, [`toDos-${session.id}`], { tags: [`toDos-${session.id}`] });
  const toDos = await getToDos(session.id!, +date[0], +date[1], +date[2]);
  return (
    <div>
      <BackToCalendar />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mt-10">{+date[1]}월 {date[2]}일</h1>
        <div className="flex flex-col gap-5">
          <ToDoList toDos={toDos} />
        </div>
        <AddToDos />
      </div>
    </div>
  );
}