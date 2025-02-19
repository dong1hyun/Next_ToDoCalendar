"use client"

import { EMAIL_REGEX, PASSWORD_MAX_LENGH_ERROR, PASSWORD_MIN_LENGH_ERROR, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, INVALID_EMAIL_ERROR, USERNAME_MAX_LENGTH_ERROR, USERNAME_MIN_LENGTH_ERROR } from "@/app/lib/const";
import { checkEmail, checkPassword, create_account } from "./action";
import Error from "@/app/components/atom/Error";
import { inputForm } from "@/app/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SpinLoading from "@/app/components/atom/SpinLoading";

export interface UseDataForm {
    username: string
    email: string
    password: string
    confirm_password: string
}

export default function CreateAccount() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<UseDataForm>();
    const [isLoading, setIsLoading] = useState(false);

    const onValid = async (data: UseDataForm) => {
        setIsLoading(true);
        await create_account(data);
        setIsLoading(false);
    }
    return (
        <div className="flex flex-col items-center mt-36 text-black gap-3">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h1>계정 생성을 위한 정보를 입력해주세요</h1>
            </div>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3 w-[390px] max-w-full px-5">
                <input {...register("username", {
                    required: "이름을 입력해주세요.",
                    maxLength: { value: 10, message: USERNAME_MAX_LENGTH_ERROR },
                    minLength: { value: 3, message: USERNAME_MIN_LENGTH_ERROR }
                })
                } placeholder="이름" className={inputForm} />
                <Error errorMsg={errors?.username?.message} />
                <input {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                        value: EMAIL_REGEX,
                        message: INVALID_EMAIL_ERROR,
                    },
                    validate: async (email) => {
                        const isValid = await checkEmail(email);
                        return isValid;
                    }
                })} placeholder="이메일" className={inputForm} />
                <Error errorMsg={errors?.email?.message} />
                <input {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                        value: PASSWORD_REGEX,
                        message: PASSWORD_REGEX_ERROR
                    },
                    maxLength: { value: 12, message: PASSWORD_MAX_LENGH_ERROR },
                    minLength: { value: 4, message: PASSWORD_MIN_LENGH_ERROR }
                })} type="password" placeholder="비밀번호" className={inputForm} />
                <Error errorMsg={errors?.password?.message} />
                <input {...register("confirm_password", {
                    required: "비밀번호를 똑같이 입력해주세요",
                    validate: (password) => {
                        return checkPassword({password, confirm_password: watch().password});
                    }
                })} type="password" placeholder="비밀번호 확인" className={inputForm} />
                <Error errorMsg={errors?.confirm_password?.message} />
                <button type="submit" className="bg-blue-700 h-10 rounded-md hover:bg-blue-600 text-white">계정 생성</button>
            </form>
            <SpinLoading isLoading={isLoading} title="계정생성중" message="잠시만 기다려주세요." style="top-1/3" size={24} />
        </div>
    )
}