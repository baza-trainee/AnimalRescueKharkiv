"use client";
import React, { useState } from "react";
import ArrowInCircle from "../CatalogCrm/CatalogCrmIcons/ArrowInCircleColor";

const SubAccirdion: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-gray-300 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between  pb-[8px] mb-5 border-b border-crm-secondary-blue items-center w-full font-normal">
        <span className="w-[300px] text-left text-[20px] text-mainBlue leading-[150%]">
          {title}
        </span>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0 "
          }`}>
          <ArrowInCircle />
        </div>
      </button>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};
export default SubAccirdion;
