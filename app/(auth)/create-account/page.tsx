"use client"

import { Error, inputForm } from "@/app/component/auth";
import { useFormState } from "react-dom";
import { create_account } from "./action";

//test
export default function createAccount() {
    const [state, action] = useFormState(create_account, null);
    return (
        <div className="flex flex-col items-center mt-36 text-black gap-3">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h1>계정 생성을 위한 정보를 입력해주세요</h1>
            </div>
            <form action={action} className="flex flex-col gap-3 w-[600px] max-w-full px-5">
                <input name="username" required placeholder="이름" className={inputForm} />
                <Error errors={state?.fieldErrors.username} />
                <input name="email" required placeholder="이메일" className={inputForm} />
                <Error errors={state?.fieldErrors.email} />
                <input name="password" required type="password" placeholder="비밀번호" className={inputForm} />
                <Error errors={state?.fieldErrors.password} />
                <input name="confirm_password" required type="password" placeholder="비밀번호 확인" className={inputForm} />
                <Error errors={state?.fieldErrors.confirm_password} />
                <button type="submit" className="bg-blue-700 h-10 rounded-md hover:bg-blue-600 text-white">계정 생성</button>
            </form>
        </div>
    )
}