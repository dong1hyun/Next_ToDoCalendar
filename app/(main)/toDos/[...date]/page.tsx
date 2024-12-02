import { getToDos } from "./action";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import AddToDos from "@/app/components/toDos/addToDo";
import ToDoList from "@/app/components/toDos/toDoList";
import { find_userId, findUser } from "@/app/lib/serverUtil";

interface paramsForm {
  params: {
    email: string
    date: string[]
  }
}

export default async function ToDos({ params }: paramsForm) {
  const date = params.date;
  const user = await findUser();
  const userId = await find_userId();
  const year = +date[0];
  const month = +date[1];
  const day = +date[2]
  const getCachedToDos = nextCache(getToDos, 
    [`${userId}-${year}-${month}-${day}`],
    {
      tags: [`${userId}-${year}-${month}-${day}`],
      revalidate: 30
    });
  const toDos = await getCachedToDos(user, year, month, day);
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