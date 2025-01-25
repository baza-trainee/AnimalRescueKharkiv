'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import StatisticIcon from "./MenuDesktopIcons/Statistic";
import AddIcon from "./MenuDesktopIcons/Add";
import CardIcon from "./MenuDesktopIcons/Card";
import ProfileIcon from "./MenuDesktopIcons/Profile";
import ProfileLogoIcon from "./MenuDesktopIcons/ProfileLogo"

type Path = '/crm' | '/crm/add-card' | '/crm/catalog' | '/crm/profile';

const MenuDesktop = () => {
  const pathname = usePathname();
  const isActive = (path: Path): boolean => pathname === path;
  return (
    <section>
      <nav className="hidden md:flex flex-col justify-between md:w-[250px] xl:w-[374px] min-h-screen m-0 border md:px-[38px] xl:px-[64px] md:py-[18px] xl:py-[40px] md:text-base xl:text-xl font-bold text-mainBlue">
        <ul className=" w-full flex justify-start flex-col md:gap-[18px] xl:gap-[24px]">
          <li className="w-full flex justify-start font-medium mb-[40px]">
            <Link href="/crm" className={`flex flex-row items-center ${isActive('/crm') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}><div className=" flex justify-center gap-[8px]"> <ProfileLogoIcon /><p>User</p></div></Link>
          </li>
          <li className="w-full flex justify-start">
            <Link href="/crm" className={`flex flex-row items-center ${isActive('/crm') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}><div className=" flex justify-center gap-[8px]"> <StatisticIcon /><p>Статистика</p></div></Link>
          </li>
          <li className="w-full flex justify-start">
            <Link href="/crm/add-card" className={`flex flex-row items-center ${isActive('/crm/add-card') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}><div className=" flex justify-center gap-[8px]"> <AddIcon />
                <p>Додати картку</p>
              </div></Link>
          </li>
          <li className="w-full flex justify-start">
            <Link href="/crm/catalog" className={`flex flex-row items-center ${isActive('/crm/catalog') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}><div className=" flex justify-center gap-[8px]"><CardIcon />
                <p>Картотека</p>
              </div></Link>
          </li>
          <li className="w-full flex justify-start">
            <Link href="/crm/profile" className={`flex flex-row items-center ${isActive('/crm/profile') ? 'text-mainBlue fill-mainBlue  text-opacity-100' : ' text-mainBlue text-opacity-40 '
              } `}><div className=" flex justify-center gap-[8px]"><ProfileIcon />
                <p>Профіль</p>
              </div></Link>
          </li>
        </ul>
        <button className="md:w-[170px] md:h-[36px] xl:w-[246px] xl:h-[56px] border border-mainBlue rounded-[10px] font-normal">Вийти</button>
      </nav>
    </section>
  )
}

export default MenuDesktop;