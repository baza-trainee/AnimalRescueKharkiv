"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import StatisticIcon from "./FooterIcons/Statistic";
import AddIcon from "./FooterIcons/Add";
import CardIcon from "./FooterIcons/Card";
import ProfileIcon from "./FooterIcons/Profile";


type Path = '/crm' | '/crm/add-card' | '/crm/catalog' | '/crm/profile';

const FooterCrm = () => {
  const pathname = usePathname();
const isActive = (path: Path): boolean => pathname === path;
  return (
    <footer className="flex justify-center  w-[390px] h-[67px] ml-0 border-t border-lightBlue">
      <nav className="px-0 py-2">
        <ul className='flex flex-row px-4'>
          <li className="w-20 flex justify-center">
            <Link href="/crm" className={`flex flex-col items-center ${isActive('/crm') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `} >
              <div className=" flex justify-center "><StatisticIcon /></div>
              <p className="font-normal text-[10px] leading-normal text-center pt-1">Статистика</p>
            </Link>
          </li>
          <li className="w-20 flex justify-center">
            <Link href="/crm/add-card" className={`flex flex-col items-center ${isActive('/crm/add-card') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}>
              <div className="flex justify-center"><AddIcon /></div>
              <p className="font-normal text-[10px] leading-normal text-center pt-1">Додати<br /> картку</p>
            </Link>
          </li>
          <li className="w-20 flex justify-center">
            <Link href="/crm/catalog" className={`flex flex-col items-center ${isActive('/crm/catalog') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}>
              <div className="flex justify-center"><CardIcon /></div>
              <p className="font-normal text-[10px] leading-normal text-center pt-1">Картотека</p>
            </Link>
          </li>
          <li className="w-20 flex justify-center">
            <Link href="/crm/profile" className={`flex flex-col items-center ${isActive('/crm/profile') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}>
              <div className="flex justify-center"><ProfileIcon /></div>
              <p className="font-normal text-[10px] leading-normal text-center pt-1">Профіль</p>
            </Link>
          </li>
        </ul>
      </nav>


    </footer>
  )
}

export default FooterCrm;