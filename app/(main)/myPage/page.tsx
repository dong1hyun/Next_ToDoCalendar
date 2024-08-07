"use server"

import UserInfo from "@/app/components/userInfo";
import { getUserInfo, logOut } from "./action"
import { notFound } from "next/navigation";

export default async function MyPage() {
        const user = await getUserInfo();
        if(!user) notFound(); 
    return (
        <div>
            <UserInfo user={user} />
        </div>
    )
}