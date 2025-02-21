"use client";
import Link from "next/link";
import React, { useState } from "react";
import SearchInputIcon from "../CatalogCrm/CatalogCrmIcons/SearchInputIcon";
import FilterIcon from "../CatalogCrm/CatalogCrmIcons/FilterIcon";
import SetIcon from "../CatalogCrm/CatalogCrmIcons/Set";
import CloseBtb from "../CatalogCrm/CatalogCrmIcons/Closebtn";
import { ICONS } from "../../../constants/icons/icons";

const roles = [
  "Волонтер",
  "Водій",
  "Адміністратор клініки",
  "Лікар",
  "Фотограф",
];

interface User {
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

const initialUsers: User[] = [
  {
    name: "Анна",
    email: "Ann1987@example.com",
    role: "Лікар",
    createdAt: new Date("2024-02-10"),
  },
  {
    name: "Іван",
    email: "Ivan123@example.com",
    role: "Водій",
    createdAt: new Date("2024-02-15"),
  },
  {
    name: "Марія",
    email: "Maria89@example.com",
    role: "Фотограф",
    createdAt: new Date("2024-02-12"),
  },
];

const ProfileSettings: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [sortingPopupVisible, setSortingPopupVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [sorting, setSorting] = useState<{
    date?: "new" | "old";
    alphabet?: "az" | "za";
  }>({});

  const [confirmDelete, setConfirmDelete] = useState<{
    show: boolean;
    email: string | null;
  }>({ show: false, email: null });

  const toggleFilterPopup = () => setFilterPopupVisible(!filterPopupVisible);
  const toggleSortingPopup = () => setSortingPopupVisible(!sortingPopupVisible);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value); // Функція обробки пошуку

  const applySorting = () => {
    setSortingPopupVisible(false);
  };

  let filteredUsers = selectedRole
    ? users.filter((user) => user.role === selectedRole)
    : users;

  filteredUsers = filteredUsers.filter(
    (user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sorting.date) {
    filteredUsers = filteredUsers.sort((a, b) =>
      sorting.date === "new"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  if (sorting.alphabet) {
    filteredUsers = filteredUsers.sort((a, b) =>
      sorting.alphabet === "az"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  const deleteUser = async (email: string) => {
    try {
      const response = await fetch(
        "https://animalrescuekharkiv-backend.onrender.com/users/",
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ email, domain: "string" }]),
        }
      );

      if (!response.ok) {
        throw new Error("Помилка при видаленні користувача");
      }

      setUsers(users.filter((user) => user.email !== confirmDelete.email));
      setConfirmDelete({ show: false, email: null });
    } catch (error) {
      console.error("Не вдалося видалити користувача:", error);
    }
  };

  return (
    <div className="w-[342px] mx-auto rounded-lg relative">
      <div className="w-full h-[48px] flex border rounded-[10px] gap-[8px] py-[13px] px-[8px] mb-4">
        <SearchInputIcon />
        <input
          type="text"
          placeholder="Введіть ім’я користувача або роль"
          className="w-full focus:outline-none text-sm placeholder-crm-secondary-blue bg-transparent"
          value={searchQuery}
          onChange={handleSearch} // Додаємо обробник події
        />
      </div>
      <div className="w-full h-[44px] flex justify-between p-[4px] mb-[16px]">
        <Link href="#" onClick={toggleFilterPopup}>
          <FilterIcon />
        </Link>
        {filterPopupVisible && (
          <div className="fixed w-[358px] h-fit top-40 mx-auto z-10 inset-0 flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
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
                    setSelectedRole(role === selectedRole ? null : role);
                    setFilterPopupVisible(false);
                  }}
                  className={`pt-2 cursor-pointer hover:bg-gray-100 text-[18px] font- leading-[150%] border-b-[1px] border-lightBlue w-full ${
                    selectedRole === role ? "bg-gray-200" : ""
                  }`}>
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
          <div className="fixed inset-0 flex flex-col content-center justify-center z-10 py-[16px] px-[15px] gap-[8px] overflow-auto h-full">
            <div className="bg-white py-[16px] px-6 w-[358px] rounded-[10px] mx-auto">
              <div className="w-full flex justify-end mb-2">
                <button onClick={toggleSortingPopup}>
                  <CloseBtb />
                </button>
              </div>
              <div className="w-full flex flex-col justify-center gap-[16px]">
                <div className="w-full flex flex-col justify-start gap-[11px]">
                  <h3 className="text-[24px] leading-8 font-semibold">Датою</h3>
                  <label className="w-full flex items-center gap-x-[8px] text-[18px] font-medium">
                    <input
                      type="radio"
                      name="sortingdate"
                      value="new"
                      checked={sorting.date === "new"}
                      onChange={() => setSorting({ ...sorting, date: "new" })}
                      className="size-[20px]"
                    />
                    Від найновіших
                  </label>
                  <label className="w-full flex items-center gap-x-[8px] text-[18px] font-medium">
                    <input
                      type="radio"
                      name="sortingdate"
                      value="old"
                      checked={sorting.date === "old"}
                      onChange={() => setSorting({ ...sorting, date: "old" })}
                      className="size-[20px]"
                    />
                    Від найстарших
                  </label>
                </div>
                <div className="w-full flex flex-col justify-start gap-[11px]">
                  <h3 className="text-[24px] leading-8 font-semibold">
                    Алфавітом
                  </h3>
                  <label className="w-full flex items-center gap-x-[8px] text-[18px] font-medium">
                    <input
                      type="radio"
                      name="sortingalphabet"
                      value="az"
                      checked={sorting.alphabet === "az"}
                      onChange={() =>
                        setSorting({ ...sorting, alphabet: "az" })
                      }
                      className="size-[20px]"
                    />
                    А-Я
                  </label>
                  <label className="w-full flex items-center gap-x-[8px] text-[18px] font-medium">
                    <input
                      type="radio"
                      name="sortingalphabet"
                      value="za"
                      checked={sorting.alphabet === "za"}
                      onChange={() =>
                        setSorting({ ...sorting, alphabet: "za" })
                      }
                      className="size-[20px]"
                    />
                    Я-А
                  </label>
                </div>
                <button
                  onClick={applySorting}
                  className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-[16px] leading-[24px] text-white bg-mainBlue">
                  Застосувати
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 mb-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.email} className="shadow-md p-4 rounded-lg bg-white">
              <div className="flex flex-col items-center">
                <ICONS.PROFILE_LOGO />
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p className="hidden">{user.role}</p>
              </div>
              <button
                onClick={() =>
                  setConfirmDelete({ show: true, email: user.email })
                }
                className="w-full mt-4 border bg-mainBlue text-white py-2 rounded-md hover:bg-blue-800 transition">
                Видалити користувача
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Немає користувачів</p>
        )}
      </div>
      {confirmDelete.show && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg relative text-center  shadow-lg w-[358px]">
            <button
              onClick={() => setConfirmDelete({ show: false, email: null })}
              className="w-full flex justify-end mb-4">
              <CloseBtb />
            </button>
            <div className="mb-4">
              <p className="text-[20px] leading-[150%]">
                Ви впевнені, що хочете видалити користувача
              </p>
              <p className="text-[20px] text-mainBlue">
                {confirmDelete.email}
                <span className="text-black">?</span>{" "}
              </p>
            </div>
            <div className="flex justify-end flex-col gap-4">
              <button
                onClick={() => deleteUser(confirmDelete.email!)}
                className="px-4 py-2 bg-mainBlue text-white rounded">
                Видалити
              </button>
              <button
                onClick={() => setConfirmDelete({ show: false, email: null })}
                className="px-4 py-2 bg-white text-mainBlue border-mainBlue border-2 rounded">
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
