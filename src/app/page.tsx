import Link from "next/link";
import Main from "../components/common/MainPage";

export default function Home() {
  return (
      <div className="flex flex-col justify-items-center">
      <h1 className="mx-auto text-center mt-20 mb-36 font-bold text-2xl text-black" >CRM СИСТЕМА<br/>
Animal Rescue Kharkiv</h1>
      <div className="mx-auto mb-40"><Main/></div>
      <Link href="/login"  className="mx-6  py-3 rounded-lg bg-[#4855CC] text-white text-center font-normal text-[20px] leading-[30px]">Увійти</Link>
      </div>
    
  )
}