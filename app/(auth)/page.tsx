import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="text-white flex flex-col items-center mt-36 gap-5">
      <span className="text-xl font-mj mb-16">자신만의 달력을 완성해보세요</span>
      <div className="flex flex-col items-center gap-3">
        <Image src={"/calendar.png"} alt="calendar" width={100} height={100} />
        <span className="text-2xl font-mj">ToDo Calendar</span>
      </div>
      
      <div className="pt-10 flex flex-col gap-3 items-center *:rounded-md *:p-3 *:w-40 *: text-center">
        <Link href={"/create-account"} className="bg-red-500">계정생성</Link>
        <Link href={"/login"} className="bg-blue-500">로그인</Link>
      </div>
    </div>)
}
