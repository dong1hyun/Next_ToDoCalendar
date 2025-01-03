"use client"

import { Error, inputForm } from "@/app/components/Auth";
import { useFormState } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { userLogIn } from "./action";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
    const [state, action] = useFormState(userLogIn, null);
    const date = new Date();
    const user = useSession();
    return (
        <div className="flex flex-col justify-center items-center mt-36 text-black gap-3 ">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl">반갑습니다!</h1>
                <h1>로그인 정보를 입력해주세요</h1>
            </div>
            <form action={action} className="flex flex-col gap-3 px-5 w-[390px]">
                <input name="email" required placeholder="이메일" className={inputForm} />
                <Error errors={state?.fieldErrors.email} />
                <input name="password" required type="password" placeholder="비밀번호" className={inputForm} />
                <Error errors={state?.fieldErrors.password} />
                <button className="bg-blue-700 h-10 rounded-md hover:bg-blue-600 text-white">로그인</button>
                <div className="my-6 h-px bg-neutral-500" />
            </form>
            <div className="flex text-white">
                <div onClick={() => signIn("google", { callbackUrl: `/home/${date.getFullYear()}/${date.getMonth() + 1}` })}
                    className="w-[350px] flex items-center justify-center cursor-pointer bg-blue-700 h-10 rounded-md hover:bg-blue-600">
                    <FcGoogle className="size-5" />continue with google
                </div>
            </div>
        </div>
    )
}