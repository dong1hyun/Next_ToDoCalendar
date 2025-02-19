"use client"

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { inputForm } from "@/app/ui";
import Error from "@/app/components/atom/Error";
import { useForm } from "react-hook-form";
import { userLogIn } from "./action";
import { useState } from "react";
import SpinLoading from "@/app/components/atom/SpinLoading";

export interface UserDataForm {
    email: string
    password: string
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserDataForm>();
    const date = new Date();
    const [isLoading, setIsLoading] = useState(false);
     const [failMsg, setFailMsg] = useState("");
    const onValid = async (data: UserDataForm) => {
        setIsLoading(true);
        const msg = await userLogIn(data);
        setFailMsg(msg);
        setIsLoading(false);
    }
    return (
        <div className="relative flex flex-col justify-center items-center mt-36 text-black gap-3 ">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl">반갑습니다!</h1>
                <h1>로그인 정보를 입력해주세요</h1>
            </div>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3 px-5 w-[390px]">
                <input {...register("email", {
                    required: "이메일을 입력해주세요",
                })} placeholder="이메일" className={inputForm} />
                <Error errorMsg={errors?.email?.message} />
                <input {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                })} type="password" placeholder="비밀번호" className={inputForm} />
                <Error errorMsg={errors?.password?.message || failMsg}  />
                <button className="bg-blue-700 h-10 rounded-md hover:bg-blue-600 text-white">로그인</button>
                <div className="my-6 h-px bg-neutral-500" />
            </form>
            <div className="flex text-white">
                <div onClick={() => signIn("google", { callbackUrl: `/home/${date.getFullYear()}/${date.getMonth() + 1}` })}
                    className="w-[350px] flex items-center justify-center cursor-pointer bg-blue-700 h-10 rounded-md hover:bg-blue-600">
                    <FcGoogle className="size-5" />continue with google
                </div>
            </div>
            <SpinLoading isLoading={isLoading} title="로그인중" message="잠시만 기다려주세요." style="top-1/3" size={24} />
        </div>
    )
}