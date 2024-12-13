"use server"

import { getMypageTypeCount, getUserInfo } from "./action"
import { notFound } from "next/navigation";
import MyResponsivePie from "@/app/components/Chart";
import { unstable_cache as nextCache } from "next/cache";
import { findUser } from "@/app/lib/serverUtil";
import UserInfo from "@/app/components/myPage/UserInfo";

const typeCount = {
    work: 0,
    friend: 0,
    individual: 0,
    education: 0,
    social: 0
}

export default async function MyPage() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const userInfo = await getUserInfo();
    const user = await findUser();
    if (!user) notFound();

    const getCachedMypageTypeCount = nextCache(getMypageTypeCount,
        [`${user.id}`],
        {
            tags: [`${user.id}`],
            revalidate: 30
        });
    const counts = await getCachedMypageTypeCount(user);
    counts.forEach((item) => {
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
    });
    return (
        <div className="">
            <UserInfo user={userInfo} />
            <div className="flex flex-col items-center mt-10">
                <div className="text-2xl font-bold">{`${month}월 완료한 일`}</div>
                <div className="size-80">
                    <MyResponsivePie typeCount={typeCount} colors={['#3498db', '#fbc531', '#e84118', '#3ae374', '#7158e2']} />
                </div>
            </div>
        </div>
    )
}