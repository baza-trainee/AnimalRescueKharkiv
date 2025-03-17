"use client";
import Link from "next/link";
import React, { useState } from "react";
import AccordionItem from "./AccordoinItem";
import { ICONS } from "../../../constants/icons/icons";
import EmailForm from "./EmailForm";
import FilterIcon from "../CatalogCrm/CatalogCrmIcons/FilterIcon";
import SetIcon from "../CatalogCrm/CatalogCrmIcons/Set";
import CloseBtb from "../CatalogCrm/CatalogCrmIcons/Closebtn";
import UserSearchAndFilter from "./UserSearchAndFilter";
import SettingsRole from "./SettingsRole";

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
    <div className="w-[342px] mx-auto rounded-lg relative">
      <AccordionItem title="Запросити нового користувача">
        <EmailForm onSubmit={handleSubmit} />
      </AccordionItem>
      <AccordionItem title="Користувачі та доступи">
        <UserSearchAndFilter domain="crm"/>
      </AccordionItem>
      <AccordionItem title="Налаштування ролей">
        <SettingsRole />
      </AccordionItem>
      <AccordionItem title="Зміна паролю">P0</AccordionItem>
      <Link href="../../crm">
        <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition">
          Вийти
        </button>
      </Link>
    </div>
  );
};

export default ProfileSettings;
