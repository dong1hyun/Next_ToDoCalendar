"use server"

import UserInfo from "@/app/components/myPage/userInfo";
import { getUserInfo, logOut } from "./action"
import { notFound } from "next/navigation";
import MyResponsivePie from "@/app/components/Chart";
import { getTypeCount } from "../home/[...date]/page";

export default async function MyPage() {
    const user = await getUserInfo();
    if (!user) notFound();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const work = await getTypeCount("업무", year, month, true);
    const friend = await getTypeCount("지인", year, month, true);
    const individual = await getTypeCount("개인", year, month, true);
    const education = await getTypeCount("교육", year, month, true);
    const social = await getTypeCount("사회활동", year, month, true);
    const data = [
        {
            "id": "업무",
            "label": "업무",
            "value": work,
        },
        {
            "id": "지인",
            "label": "지인",
            "value": friend,
        },
        {
            "id": "개인",
            "label": "개인",
            "value": individual,
        },
        {
            "id": "교육",
            "label": "교육",
            "value": education,
        },
        {
            "id": "사회활동",
            "label": "사회활동",
            "value": social,
        },
    ]
    return (
        <div className="">
            <UserInfo user={user} />
            <div className="flex flex-col items-center mt-10">
                <div className="text-2xl font-bold">{`${month}월 완료한 일`}</div>
                <div className="size-80">
                    <MyResponsivePie data={data} colors={['#c56cf0', '#706fd3', '#34ace0', '#ff793f', '#e74c3c']} />
                </div>
            </div>
        </div>
    )
}