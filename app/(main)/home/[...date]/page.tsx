import { Calendar } from "../../../components/calendar";
import MyResponsivePie from "@/app/components/Chart";
import { find_userId, findUser } from "@/app/lib/serverUtil";
import { unstable_cache as nextCache } from "next/cache";
import { getCounts } from "./action";

interface urlForm {
    params: {
        date: string[];
    }
}

const typeCount = {
    work: 0,
    friend: 0,
    individual: 0,
    education: 0,
    social: 0
}

export default async function Home({ params }: urlForm) {
    const year = +params.date[0];
    const month = +params.date[1];
    const limit = new Date(year, month, 0).getDate();
    const toDoCount: number[] = Array(limit).fill(0);
    const completeCount: number[] = Array(limit).fill(0);
    const user = await findUser();
    const userId = await find_userId();
    try {
        const getCachedCounts = nextCache(
            getCounts,
            [`${userId}-${year}-${month}`],
            {
                tags: [`${userId}-${year}-${month}`],
                revalidate: 30
            }
        )
        const counts = await getCachedCounts({user, year, month});

        counts.forEach((item) => {
            if (item.isComplete) {
                completeCount[item.day - 1]++;
            } else {
                toDoCount[item.day - 1]++;
            }

            if (!item.isComplete) {
                if (item.type == "업무") {
                    typeCount.work++;
                } else if (item.type == "지인") {
                    typeCount.friend++;
                } else if (item.type == "개인") {
                    typeCount.individual++;
                } else if (item.type == "교육") {
                    typeCount.education++;
                } else {
                    typeCount.social++;
                }
            }
        });
    } catch (error) {
        console.error("toDo count 에러:", error);
    }
    
    return (
        <div className="flex flex-col xl:flex-row justify-center items-center xl:gap-5">
            <Calendar toDoCount={toDoCount} completeCount={completeCount} />
            <div className="flex flex-col items-center mt-12 xl:mt-32">
                <h1 className="text-xl font-bold">당월 할 일 차트</h1>
                <div className="w-80 h-80">
                    <MyResponsivePie typeCount={typeCount} colors={['#c56cf0', '#706fd3', '#34ace0', '#ff793f', '#e74c3c']} />
                </div>
            </div>
        </div>
    )
}