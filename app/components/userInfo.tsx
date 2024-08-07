"use client"

import { logOut } from "../(main)/myPage/action"

interface userForm {
    username: string,
    email: string
}

export default function UserInfo({user}: {user:userForm}) {
    return (
        <div className="flex flex-col gap-4 mt-32">
            <div>이름: {user.username}</div>
            <div>이메일: {user.email}</div>
            {/* <form action={logOut}>
                <button>로그아웃</button>
            </form> */}
            <button onClick={logOut}>로그아웃</button>
        </div>
    )
}