import { getToDos } from "./action";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { findUserEmail } from "@/app/lib/serverUtil";
import ToDoList from "@/app/components/toDos/ToDoList";
import AddToDos from "@/app/components/toDos/AddToDo";

interface paramsForm {
  params: {
    email: string
    date: string[]
  }
}

export default async function ToDos({ params }: paramsForm) {
  const email = await findUserEmail();
  const date = params.date;
  const year = +date[0];
  const month = +date[1];
  const day = +date[2]
  const getCachedToDos = nextCache(getToDos, 
    [`${email}-${year}-${month}-${day}`],
    {
      tags: [`${email}-${year}-${month}-${day}`],
      revalidate: 30
    });
  const toDos = await getCachedToDos(email, year, month, day);
  return (
    <div>
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-3xl mt-10">{month}월 {date[2]}일</h1>
        <div className="flex flex-col gap-5">
          <ToDoList toDos={toDos} year={year} month={month} day={day} />
        </div>
        <AddToDos />
      </div>
    </div>
  );
}