"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchInputIcon from "../CatalogCrm/CatalogCrmIcons/SearchInputIcon";
import FilterIcon from "../CatalogCrm/CatalogCrmIcons/FilterIcon";
import SetIcon from "../CatalogCrm/CatalogCrmIcons/Set";
import CloseBtb from "../CatalogCrm/CatalogCrmIcons/Closebtn";
import { ICONS } from "../../../constants/icons/icons";
import { features } from "process";
import { fetch, remove } from "../../../utils/api";

interface Role {
  id: string;
  title: string;
}

interface User {
  name: string;
  email: string;
  role: string;
  photo: string;
}

const ProfileSettings: React.FC<{ domain: string }> = ({ domain }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [sortingPopupVisible, setSortingPopupVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchUsers = async (domain: string) => {
      try {
        const usersPath = process.env.NEXT_PUBLIC_API_USERS_PATH?.replace(
          "{domain}",
          domain
        );
        if (usersPath === undefined) {
          throw new Error(
            "Missing NEXT_PUBLIC_API_USERS_PATH environment variable"
          );
        }
        const data: User[] = await fetch(usersPath);
        const transformedUsers: User[] = data.map((user: any) => ({
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role?.title || "Не вказано",
          photo: user.photo?.uri || "",
        }));
        setUsers(transformedUsers);
      } catch (error) {
        console.error("Не вдалося завантажити користувачів:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const rolesPath = `/roles/${domain}`;
        const data: Role[] = await fetch(rolesPath);
        setRoles(data);
      } catch (error) {
        console.error("Не вдалося завантажити ролі:", error);
      }
    };

    fetchRoles();
    fetchUsers(domain);
  }, []);
  const [sorting, setSorting] = useState<{
    date?: "new" | "old";
    alphabet?: "az" | "za";
  }>({});

  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [selectedRol, setSelectedRol] = useState("Ролі");

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

  const deleteUser = async (email: string) => {
    try {
      await remove("/users/", [{ email, domain: "crm" }]);

      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
      setConfirmDelete({ show: false, email: null });
    } catch (error) {
      console.error("Не вдалося видалити користувача:", error);
    }
  };

  const useFetchRoles = (domain: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const usersPath = process.env.NEXT_PUBLIC_API_USERS_PATH?.replace(
            "{domain}",
            domain
          );
          if (!usersPath) throw new Error("API path is not defined");

          const data: User[] = await fetch(usersPath);
          const transformedUsers: User[] = data.map((user: any) => ({
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role?.title || "Не вказано",
            photo: user.photo?.uri || "",
          }));
          setUsers(transformedUsers);
        } catch (error) {
          setError("Не вдалося завантажити користувачів");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }, [searchQuery, selectedRole, sorting, domain]);

    return { users, loading, error };
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
          onChange={(e) => setSearchQuery(e.target.value)}
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
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.title === selectedRole ? null : role.title);
                    setFilterPopupVisible(false);
                  }}
                  className={`pt-2 cursor-pointer hover:bg-gray-100 text-[18px] font- leading-[150%] border-b-[1px] border-lightBlue w-full ${
                    selectedRole === role.title ? "bg-gray-200" : ""
                  }`}>
                  {role.title}
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
        {users.map((user) => (
          <div key={user.email} className="shadow-md p-4 rounded-lg bg-white">
            <div className="flex flex-col items-center text-mainBlue">
              <ICONS.PROFILE_LOGO />
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p className="hidden">{user.role}</p>
            </div>

            <label htmlFor="role-select" className="text-[18px] font-medium">
              Оберіть роль користувача
            </label>
            <div className="relative w-full">
              {/* Поле для вибору */}
              <div
                onClick={() =>
                  setIsOpen(isOpen === user.email ? null : user.email)
                }
                className="w-full p-[8px] border rounded-xl mt-[4px] mb-4 flex justify-between items-center cursor-pointer text-[14px] text-crm-secondary-blue">
                <span>{user.role}</span>
                {ICONS.ARROW_IN_CIRCLE && (
                  <ICONS.ARROW_IN_CIRCLE className="absolute right-[8px] transform text-gray-500 cursor-pointer" />
                )}
              </div>
              {/* Попап зі списком ролей */}
              {isOpen === user.email && (
                <div className="fixed inset-0 flex flex-col content-center justify-center z-10 -top-10 py-[16px] gap-[8px] overflow-auto h-full">
                  <div className="bg-white py-3 px-6 w-[358px] rounded-[10px] mx-auto">
                    <div className="w-full flex justify-end">
                      <button onClick={() => setIsOpen(null)}>
                        <CloseBtb />
                      </button>
                    </div>
                    {roles.map((role) => (
                      <div
                        key={`${user.email}-${role}`}
                        onClick={() => {
                          setUsers((prevUsers) =>
                            prevUsers.map((u) =>
                              u.email === user.email ? { ...u, role: role.title } : u
                            )
                          );
                          setIsOpen(null);
                        }}
                        className="pt-2 cursor-pointer hover:bg-gray-100 text-[18px] font- leading-[150%] border-b-[1px] border-lightBlue">
                        {role.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() =>
                setConfirmDelete({ show: true, email: user.email })
              }
              className="w-full mt-4 border bg-mainBlue text-white py-2 rounded-md hover:bg-blue-800 transition">
              Видалити користувача
            </button>
          </div>
        ))}
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
