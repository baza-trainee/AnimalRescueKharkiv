"use client";
import React, { useState } from "react";
import EmailInput from "../../ui/inputs/EmailInput";
import { ICONS } from "../../../constants/icons/icons";
import CloseBtb from "../CatalogCrm/CatalogCrmIcons/Closebtn";

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Будь ласка, введіть адресу електронної пошти!");
      return;
    }
    setError("");
    setSuccessMessage(`Запрошення надіслано на ${email}!`);
    onSubmit(email);
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
    <div>
      {error && (
        <div className="text-red-600 text-center mb-4">
          <p>{error}</p>
          <p>Бажаєте спробувати ще раз?</p>
        </div>
      )}
      {successMessage && (
        <div className="text-mainBlue text-center mb-4">
          <p>{successMessage}</p>
          <p>Бажаєте відправити ще одне запрошення?</p>
        </div>
      )}
      <EmailInput
        label="Адреса електронної пошти"
        name="email"
        placeholder="Введіть адресу"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={error}
        className="border rounded-2xl text-[14px]"
      />
      <label htmlFor="role-select" className="text-[18px] font-medium">
        Оберіть роль користувача
      </label>
      <div className="relative w-full">
        {/* Поле для вибору */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-[8px] border rounded-xl mt-[4px] mb-4 flex justify-between items-center cursor-pointer text-[14px] text-crm-secondary-blue">
          <span>{selectedRole}</span>
          {ICONS.ARROW_IN_CIRCLE && ( // Перевіряємо, чи існує іконка
            <ICONS.ARROW_IN_CIRCLE
              className="absolute right-[8px] transform  text-gray-500 cursor-pointer"
              onClick={() => {
                document.getElementById("role-select")?.focus();
              }}
            />
          )}
        </div>
        {/* Попап зі списком ролей */}
        {isOpen && (
          <div className="fixed inset-0 flex flex-col content-center justify-center z-10 -top-10  py-[16px]  gap-[8px] overflow-auto h-full ">
            <div className="bg-white py-3 px-6 w-[358px] rounded-[10px] mx-auto">
              <div className="w-full flex justify-end">
                <button onClick={() => setIsOpen(false)}>
                  <CloseBtb />
                </button>
              </div>
              {roles.map((role) => (
                <div
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setIsOpen(false);
                  }}
                  className="pt-2 cursor-pointer hover:bg-gray-100 text-[18px] font- leading-[150%]  border-b-[1px] border-lightBlue">
                  {role}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-mainBlue text-white py-2 rounded-md mb-1 hover:bg-blue-700 transition">
        Відправити запрошення
      </button>
    </div>
  );
};

export default EmailForm;
