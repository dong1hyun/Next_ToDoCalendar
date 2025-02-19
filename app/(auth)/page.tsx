'use client'

import Image from "next/image"
import { guestLogin } from "./login/action"
import AuthLink from "../components/atom/AuthLink"
import SpinLoading from "../components/atom/SpinLoading";
import { useState } from "react";

export default function Home() {
  const [isGuestLoggingin, setisGuestLoggingin] = useState(false);
  const handleGuestLogin = async () => {
    setisGuestLoggingin(true);
    try {
      await guestLogin();
      setisGuestLoggingin(false);
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <div className="relative text-black flex flex-col items-center mt-36 gap-5 font-mj">
      <span className="text-2xl mb-16">자신만의 달력을 완성해보세요</span>
      <div className="flex flex-col items-center gap-3">
        <Image src={"/calendar.png"} alt="calendar" width={100} height={100} />
        <span className="text-2xl font-mj">ToDo Calendar</span>
      </div>
      
      <div className="pt-10 flex flex-col gap-3 items-center *:rounded-md *: text-center">
        <AuthLink path="/create-account" color="bg-red-500" title="계정생성" />
        <AuthLink path="/login" color="bg-blue-500" title="로그인" />
        <div className="border-b border-solid border-neutral-400 w-40" />
        <button onClick={() => {handleGuestLogin()}} className="bg-yellow-500 p-3 w-40">게스트 로그인</button>
        <SpinLoading isLoading={isGuestLoggingin} title="로그인중" message="잠시만 기다려주세요." style="top-1/4" size={24} />
      </div>
    </div>
    );
}