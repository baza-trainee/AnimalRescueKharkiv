"use client";
import React, { useState } from "react";

const AccordionItem: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-3 font-semibold 
         ">
        <span className="w-[300px] text-left text-[24px] leading-[150%]">
          {title}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const ProfileSettings: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      <AccordionItem title="Запросити нового користувача">
        <label
          htmlFor="countries"
          className="block mb-2 text-[18px] font-medium text-gray-900 leading-[150%]">
          Адреса електронної пошти
        </label>
        <input
          type="email"
          placeholder="Введіть адресу"
          className="w-full p-2 border rounded-xl mb-2 border-lightBlue"
        />
        <select className="w-full p-2 border rounded-xl mb-2">
          <option>Ролі</option>
          <option>Адміністратор</option>
          <option>Користувач</option>
        </select>
        <button className="w-full bg-mainBlue text-white py-2 rounded-md">
          Відправити запрошення
        </button>
      </AccordionItem>

      <AccordionItem title="Користувачі та доступи" />
      <AccordionItem title="Налаштування ролей" />
      <AccordionItem title="Зміна паролю" />

      <button className="w-full mt-4 border border-mainBlue text-mainBlue py-2 rounded-md">
        Вийти
      </button>
    </div>
  );
};

export default ProfileSettings;
