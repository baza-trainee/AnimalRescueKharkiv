"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { ICONS } from "../../../constants/icons/icons";
import { inter } from "../../../fonts";

const HeaderCrm: React.FC<{ title: string }> = ({ title }) => {
  const pathname = usePathname();
  const isProfilePage = pathname.includes("/crm/profile");

  return (
    <header className="flex mx-auto justify-between w-[390px] pt-[18px] pb-[2px] border-b border-lightBlue ">
      <div className="w-[342px] mx-auto flex mx-auto items-center justify-between">
        <h1
          className={`${inter.className} font-bold text-[24px] leading-[150%] text-mainBlue`}
        >
          {title}
        </h1>
        {isProfilePage && (
          <div className="flex flex-col items-center text-mainBlue ml-4 block">
            <ICONS.PROFILE_LOGO />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderCrm;
