"use client";
import Link from "next/link";
import React, { useState } from "react";
import ArrowInCircle from "../CatalogCrm/CatalogCrmIcons/ArrowInCircle";
import SearchInputIcon from "../CatalogCrm/CatalogCrmIcons/SearchInputIcon";
import { ICONS } from "../../../constants/icons/icons";
import EmailInput from "../../ui/inputs/EmailInput";
import FilterIcon from "../CatalogCrm/CatalogCrmIcons/FilterIcon";
import SetIcon from "../CatalogCrm/CatalogCrmIcons/Set";
import CloseBtb from "../CatalogCrm/CatalogCrmIcons/Closebtn";
  

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

  return (
    <div className="w-full max-w-md mx-auto rounded-lg p-4 relative">
      <AccordionItem title="Запросити нового користувача">
        {error && (
          <div className="text-red-600 text-center mb-4 w-[275px] mx-auto">
            <p>{error}</p>
            <p>Бажаєте спробувати ще раз?</p>
          </div>
        )}
        {successMessage && (
          <div className="text-mainBlue text-center mb-4">
            <p>{successMessage}</p>
            <br />
            <p>Бажаєте відправити ще одне запрошення?</p>
          </div>
        )}
        <EmailInput
          label="Адреса електронної пошти"
          name="email"
          placeholder="Введіть адресу"
          value={email} // Додаємо value
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={error} // Передаємо помилку
        />
        <label htmlFor="role-select" className="text-[18px] font-medium">
          Оберіть роль користувача
        </label>
        <div className="relative w-full">
          <select
            id="role-select"
            className="w-full p-2 border rounded-xl mt-[4px] mb-4 appearance-none">
            <option>Ролі</option>
            <option>Адміністратор</option>
            <option>Користувач</option>
          </select>
          {ICONS.ARROW_IN_CIRCLE && ( // Перевіряємо, чи існує іконка
            <ICONS.ARROW_IN_CIRCLE
              className="absolute right-3 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => {
                document.getElementById("role-select")?.focus();
              }}
            />
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-mainBlue text-white py-2 rounded-md hover:bg-blue-700 transition">
          Відправити запрошення
        </button>
      </AccordionItem>
      <AccordionItem title="Користувачі та доступи">
        <div className="w-full h-[48px] flex border rounded-[10px] gap-[8px] py-[13px] px-[8px] mb-4">
          <SearchInputIcon />
          <input
            type="text"
            placeholder="Введіть ім’я користувача або роль"
            className="w-full focus:outline-none text-sm placeholder-color-Id bg-transparent"
          />
        </div>
        <div className="w-full h-[44px] flex justify-between p-[4px]">
          <Link href="#" onClick={toggleFilterPopup}>
            <FilterIcon />
          </Link>
          {filterPopupVisible && (
            <div className="fixed w-full z-10 inset-0  flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
              <div className="w-full h-[24px] flex justify-end">
                <button onClick={toggleFilterPopup}>
                  <CloseBtb />
                </button>
              </div>
              {/* <div className="w-full h-[36px] flex justify-center">
                <Header title="Фільтри" />
              </div> */}

              <div className="w-full flex flex-col items-start">
                {/* {filters.map((filter, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col items-start mt-4">
                    <div
                      className="w-full flex justify-between items-center"
                      onClick={() => toggleContent(index)}>
                      <h3 className="text-2xl font-semibold cursor-pointer">
                        {filter.title}
                      </h3>
                      <button className="flex items-center">
                        <DownArrow
                          className={
                            contentVisibility[index]
                              ? "transform transition-transform duration-200 rotate-180"
                              : ""
                          }
                        />
                      </button>
                    </div>
                    {contentVisibility[index] && (
                      <div className="mt-4 w-full">{filter.content}</div>
                    )}
                  </div>
                ))} */}
              </div>

              <div className="w-full flex flex-col gap-[8px] mt-[8px] text-xl">
                <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-mainBlue">
                  Скинути фільтри
                </button>
                <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-white bg-mainBlue">
                  Показати картки
                </button>
              </div>
            </div>
          )}
          <Link href="#" onClick={toggleSortingPopup}>
            <SetIcon />
          </Link>
          {sortingPopupVisible && (
            <div className="fixed inset-0 flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto w-full z-30">
              <div className="w-full h-[24px] flex justify-end">
                <button onClick={toggleSortingPopup}>
                  <CloseBtb />
                </button>
              </div>
              <div className="w-full flex flex-col justify-center gap-[16px]">
                <div className="w-full flex flex-col justify-start gap-[11px]">
                  <h3 className="text-2xl font-semibold">Датою</h3>
                  <label
                    className="w-full flex items-center gap-[4px] text-lg font-medium
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
                    className="w-full flex items-center gap-[4px] text-lg font-medium
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
                  <h3 className="text-2xl font-semibold">Алфавітом</h3>
                  <label
                    className="w-full flex items-center gap-[4px] text-lg font-medium
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
                    className="w-full flex items-center gap-[4px] text-lg font-medium
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
                <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-xl text-white bg-mainBlue">
                  Застосувати
                </button>
              </div>
            </div>
          )}
        </div>
      </AccordionItem>
      <AccordionItem title="Налаштування ролей" />
      <AccordionItem title="Зміна паролю" />

      <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition">
        Вийти
      </button>
    </div>
  );
};

export default ProfileSettings;
