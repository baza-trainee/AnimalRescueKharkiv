"use client";
import { usePathname } from "next/navigation";
import React from "react";
import ProfileIcon from "../../../../public/assets/icons/menuDesktop/profile-logo.svg";
import { inter } from "../../../fonts";

const HeaderCrm: React.FC<{ title: string }> = ({ title }) => {
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/crm/profile");

  return (
    <header className="flex mx-auto justify-between w-[390px] pt-[18px] pb-2 border-b border-lightBlue ">
      <div className="w-[347px] mx-auto flex mx-auto items-center justify-between">
        <h1
          className={`${inter.className} font-bold text-[24px] leading-[150%] text-mainBlue`}>
          {title}
        </h1>
        {isProfilePage && (
          <div className="flex flex-col items-center text-mainBlue ml-4 block">
            <ProfileIcon />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderCrm;
