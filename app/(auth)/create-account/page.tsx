import { inputForm } from "@/app/component/auth";

export default function createAccount() {
    return (
    <div className="flex flex-col font-mj py-8 px-96 text-white">
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl">안녕하세요!</h1>
            <h1>정보를 입력해주세요</h1>
        </div>
        <form className="flex flex-col gap-3">
            <input placeholder="nickName" className={inputForm} />
            <input placeholder="email" className={inputForm} />
            <input placeholder="password" className={inputForm} />
            <input placeholder="confirm password" className={inputForm} />
        </form>
    </div>)
}