"use client"

import { Error, inputForm } from "@/app/component/auth";
import Link from "next/link";
import { useFormState } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { Login } from "./action";

export default function login() {
    const [state, action] = useFormState(Login, null);
    return (
        <div className="flex flex-col items-center font-mj mt-36 text-white gap-3">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl">반갑습니다!</h1>
                <h1>로그인 정보를 입력해주세요</h1>
            </div>
            <form action={action} className="flex flex-col gap-3 w-[600px] max-w-full px-5">
                <input name="email" required placeholder="이메일" className={inputForm} />
                <Error errors={state?.fieldErrors.email} />
                <input name="password" required type="password" placeholder="비밀번호" className={inputForm} />
                <Error errors={state?.fieldErrors.password} />
                <button className="bg-blue-700 h-10 rounded-md hover:bg-blue-600">로그인</button>
                <div className="my-6 w-full h-px bg-neutral-500" />
            </form>
            <div className="flex px-5 w-[600px] max-w-full">
                <Link href={"test"} className="flex w-full items-center justify-center bg-blue-700 h-10 rounded-md hover:bg-blue-600"><FcGoogle className="size-5"/>continue with google</Link>
            </div>
        </div>
    )
}