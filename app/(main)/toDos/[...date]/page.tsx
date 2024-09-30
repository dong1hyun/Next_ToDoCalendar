import getSession from "@/app/lib/session";
import { find_userId, getToDos } from "./action";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import AddToDos from "@/app/components/toDos/addToDo";
import ToDoList from "@/app/components/toDos/toDoList";
import BackToCalendar from "@/app/components/backToCalendar";
import { findUser } from "../../home/[...date]/page";

interface paramsForm {
  params: {
    email: string
    date: string[]
  }
}

export default async function ToDos({ params }: paramsForm) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const date = params.date;
  const getCachedToDos = nextCache(getToDos, [`toDos-${date[0]}-${date[1]}-${date[2]}`], { tags: [`toDos-${date[0]}-${date[1]}-${date[2]}`], revalidate: 30 });
  const user = await findUser();
  const toDos = await getCachedToDos(user, +date[0], +date[1], +date[2]);
  return (
    <div>
      {/* <BackToCalendar /> */}
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-3xl mt-10">{+date[1]}월 {date[2]}일</h1>
        <div className="flex flex-col gap-5">
          <ToDoList toDos={toDos} year={+date[0]} month={+date[1]} day={+date[2]} />
        </div>
        <AddToDos />
      </div>
    </div>
  );
}