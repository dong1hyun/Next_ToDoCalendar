"use client"

import { signOut, useSession } from "next-auth/react"
import { logOut } from "../../(main)/myPage/action"
import { buttonStyle } from "@/app/lib/css";

interface userForm {
    username: string,
    email: string
}

export default function UserInfo({user}: {user:userForm}) {
    const isGoogleLogin = useSession();
    return (
        <div className="flex flex-col items-start gap-4 mt-32">
            <div>이름: {user.username}</div>
            <div>이메일: {user.email}</div>
            {isGoogleLogin.data ? <button className={`${buttonStyle} bg-black px-4 py-2`} onClick={() => signOut({ callbackUrl: "/" })} >로그아웃</button>
                : <form action={logOut}>
                    <button className={`${buttonStyle} bg-black px-4 py-2`}>로그아웃</button>
                </form>}
        </div>
    )
}