import Link from "next/link";


export default function InvalidToken() {
  return (
      <div className="max-w-[342px] flex flex-col justify-items-center mx-auto">
      <h1 className="mx-auto text-center mt-[62px] mb-[40px] font-bold text-2xl text-crm-black" >Помилка <br/>
              відновлення паролю</h1>
        <p className="font-medium text-lg text-crm-black text-left mb-8">Ключ відновлення не актуальний або <br/>вже використаний.</p>
        <p className="font-medium text-lg text-center text-crm-black">Забули пароль? </p>
      <Link href="/crm/forgot-password"  className="w-fit m-auto font-medium text-lg text-center text-mainBlue mb-1">Відновити</Link>
      </div>
    
  )
}
