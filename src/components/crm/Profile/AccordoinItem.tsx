"use client";
import React, { useState } from "react";
import ArrowInCircle from "../CatalogCrm/CatalogCrmIcons/ArrowInCircle";


const AccordionItem: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-3 font-semibold">
        <span className="w-[300px] text-left text-[24px] leading-[150%]">
          {title}
        </span>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : "rotate-0 text-gray-500"
          }`}>
          <ArrowInCircle
            className={isOpen ? "invert brightness-110" : "brightness-0"}
          />
        </div>
      </button>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};
export default AccordionItem;
