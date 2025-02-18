"use client";
import Link from "next/link";
import React, { useState } from "react";
import AccordionItem from "./AccordoinItem";
import SearchInputIcon from "../CatalogCrm/CatalogCrmIcons/SearchInputIcon";
import { ICONS } from "../../../constants/icons/icons";
// import EmailInput from "../../ui/inputs/EmailInput";
import EmailForm from './EmailForm';

import FilterIcon from "../CatalogCrm/CatalogCrmIcons/FilterIcon";
import SetIcon from "../CatalogCrm/CatalogCrmIcons/Set";
import CloseBtb from "../CatalogCrm/CatalogCrmIcons/Closebtn";

const ProfileSettings: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError(
        `Не вдалось відправити запрошенння example@example.com!  ${email}`
      );
    } else {
      setError("");
      setSuccessMessage(`Запрошення надіслано на ${email} відправлено!`);
      console.log("Email відправлено:", email);
    }
  };
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [sortingPopupVisible, setSortingPopupVisible] = useState(false);
  const toggleFilterPopup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFilterPopupVisible(!filterPopupVisible);
  };
  const toggleSortingPopup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSortingPopupVisible(!sortingPopupVisible);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Ролі");

  const roles = [
    "Волонтер",
    "Водій",
    "Адміністратор клініки",
    "Лікар",
    "Фотограф",
  ];

  return (
    <div className="w-[342px] mx-auto rounded-lg relative">
      <AccordionItem title="Запросити нового користувача">
        <EmailForm onSubmit={handleSubmit} />
      </AccordionItem>
      <AccordionItem title="Користувачі та доступи">
        <div className="w-full h-[48px] flex border rounded-[10px] gap-[8px] py-[13px] px-[8px] mb-4">
          <SearchInputIcon />
          <input
            type="text"
            placeholder="Введіть ім’я користувача або роль"
            className="w-full focus:outline-none text-sm placeholder-crm-secondary-blue bg-transparent"
          />
        </div>
        <div className="w-full h-[44px] flex justify-between p-[4px] mb-[16px]">
          <Link href="#" onClick={toggleFilterPopup}>
            <FilterIcon />
          </Link>
          {filterPopupVisible && (
            <div className="fixed w-[358px] h-fit top-40 mx-auto z-10 inset-0  flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
              <div className="w-full flex justify-end">
                <button onClick={toggleFilterPopup}>
                  <CloseBtb />
                </button>
              </div>
              <div className="w-full flex flex-col items-start">
                {roles.map((role) => (
                  <div
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setIsOpen(false);
                    }}
                    className="pt-2 cursor-pointer hover:bg-gray-100 text-[18px] font- leading-[150%]  border-b-[1px] border-lightBlue w-full">
                    {role}
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link href="#" onClick={toggleSortingPopup}>
            <SetIcon />
          </Link>
          {sortingPopupVisible && (
            <div className="fixed inset-0 flex flex-col content-center justify-center z-10  py-[16px] px-[15px] gap-[8px] overflow-auto h-full ">
              <div className="bg-white py-[16px] px-6 w-[358px] rounded-[10px] mx-auto">
                <div className="w-full flex justify-end mb-2">
                  <button onClick={toggleSortingPopup}>
                    <CloseBtb />
                  </button>
                </div>
                <div className="w-full flex flex-col justify-center gap-[16px]">
                  <div className="w-full flex flex-col justify-start gap-[11px]">
                    <h3 className="text-[24px] leading-8 font-semibold">
                      Датою
                    </h3>
                    <label
                      className="w-full flex items-center gap-x-[8px] text-[18px] font-medium
          ">
                      <input
                        type="radio"
                        name="sortingdate"
                        value="new"
                        className="size-[20px] "
                      />
                      Від найновіших
                    </label>
                    <label
                      className="w-full flex items-center gap-x-[8px] text-[18px] font-medium
          ">
                      <input
                        type="radio"
                        name="sortingdate"
                        value="old"
                        className="size-[20px] "
                      />
                      Від найстарших
                    </label>
                  </div>
                  <div className="w-full flex flex-col justify-start gap-[11px]">
                    <h3 className="text-[24px] leading-8 font-semibold">
                      Алфавітом
                    </h3>
                    <label
                      className="w-full flex items-center gap-x-[8px] text-[18px] font-medium
          ">
                      <input
                        type="radio"
                        name="sortingalphabet"
                        value="az"
                        className="size-[20px] "
                      />
                      А-Я
                    </label>
                    <label
                      className="w-full flex items-center gap-x-[8px] text-[18px] font-medium
          ">
                      <input
                        type="radio"
                        name="sortingalphabet"
                        value="za"
                        className="size-[20px] "
                      />
                      Я-А
                    </label>
                  </div>
                  <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-[16px] leading-[24px] text-white bg-mainBlue ">
                    Застосувати
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[342px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
          <div className="flex flex-col items-center justify-center w-full py-[8px] px-[16px]">
            <ICONS.PROFILE_LOGO />
            <p>Анна</p>
            <p>Ann1987@example.com</p>

            <div className=""></div>
          </div>
          <div className=""></div>
        </div>
      </AccordionItem>
      <AccordionItem title="Налаштування ролей" />
      <AccordionItem title="Зміна паролю" />
      <Link href="../../crm">
        <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition">
          Вийти
        </button>
      </Link>
    </div>
  );
};

export default ProfileSettings;
