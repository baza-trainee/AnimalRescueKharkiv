"use client";
import { usePathname } from "next/navigation";
import React from "react";
import ProfileIcon from "../Footer/FooterIcons/Profile";
import { inter } from "../../../fonts";

const HeaderCrm: React.FC<{ title: string }> = ({ title }) => {
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/crm/profile");

  return (
    <header className="flex justify-between w-[390px] px-9 pt-[18px] pb-2 border-b border-lightBlue items-center">
      <h1
        className={`${inter.className} font-bold text-[24px] leading-[150%] text-mainBlue xl:text-3xl/[32px]`}>
        {title}
      </h1>
      {isProfilePage && (
        <div className="flex flex-col items-center text-mainBlue ml-4 block">
          <ProfileIcon/>
        </div>
      )}
    </header>
  );
};

export default HeaderCrm;
