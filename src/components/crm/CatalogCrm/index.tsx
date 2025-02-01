"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "../Header";
import SearchInputIcon from "./CatalogCrmIcons/SearchInputIcon";
import FilterIcon from "./CatalogCrmIcons/FilterIcon";
import SetIcon from "./CatalogCrmIcons/Set";
import AnimalLogo from "./CatalogCrmIcons/AnimalLogo";
import CloseBtb from "./CatalogCrmIcons/Closebtn";
import DownArrow from "./CatalogCrmIcons/DownArrow";

const filters = [
    { title: 'Дата Прибуття', content: <input type="text" /> },
    { title: 'Звідки (місто)', content: <div className="w-full h-[48px] flex item-center justify-center border rounded-[10px]"><input type="text" placeholder="Введіть назву міста" /></div> },
    {
        title: 'Тип тварин', content: (
            <div className="w-full flex flex-wrap gap-[16px] font-medium">
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox1" id="checkbox1" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Кіт
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox1" id="checkbox2" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Собака
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox3" id="checkbox3" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Коні
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox4" id="checkbox4" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Корова
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox5" id="checkbox5" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Кози
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox6" id="checkbox6" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Кролі
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox7" id="checkbox7" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Птахи
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox8" id="checkbox8" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Лисиці
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox9" id="checkbox9" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Інші
                </label>
            </div>)
    },
    {
        title: 'Стать', content: <div className="w-full flex items-center justify-center text-lg font-medium">
            <label className="w-full flex items-center gap-[4px]">Чол<input type="radio" name="gender" className="size-[20px] " /></label>
            <label className="w-full flex items-center gap-[4px]">Жін<input type="radio" name="gender" className="size-[20px]" /></label>
        </div>
    },
    {
        title: 'Поточна локація', content: (
            <div className="w-full flex flex-wrap gap-[16px] font-medium">
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox1" id="checkbox1" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Клініка
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox2" id="checkbox2" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Іподром
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox3" id="checkbox3" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Есеніна
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox4" id="checkbox4" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Перетримка Зоя
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox5" id="checkbox5" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Перетримка Яна
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox6" id="checkbox6" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Перетримка Марина
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox7" id="checkbox7" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Бабаї
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox8" id="checkbox8" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Жихор
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox9" id="checkbox9" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Первомайськ
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox9" id="checkbox9" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Войтенко
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox9" id="checkbox9" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Павлиш
                </label>
                <label className="w-100 flex items-center gap-[8px] text-lg">
                    <input type="checkbox" name="checkbox9" id="checkbox9" className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue" />Інше
                </label>
            </div>)
    },
    {
        title: 'Смерть', content: <div className="w-full flex items-center justify-center text-lg font-medium">
            <label className="w-full flex items-center gap-[4px]">Так<input type="radio" name="death" className="size-[20px] " /></label>
            <label className="w-full flex items-center gap-[4px]">Ні<input type="radio" name="death" className="size-[20px]" /></label>
        </div>
    },


];

const CatalogCrm = () => {
    const [filterPopupVisible, setFilterPopupVisible] = useState(false);
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);
    const [contentVisibility, setContentVisibility] = useState(Array(filters.length).fill(false));

    const toggleFilterPopup = (e) => {
        e.preventDefault();
        setFilterPopupVisible(!filterPopupVisible);
    };

    const toggleSettingsPopup = (e) => {
        e.preventDefault();
        setSettingsPopupVisible(!settingsPopupVisible);
    };

    const toggleContent = (index) => {
        setContentVisibility((prev) => {
            const newContentVisibility = [...prev];
            newContentVisibility[index] = !newContentVisibility[index];
            return newContentVisibility;
        })
    };

    return (
        <>
            <section>
                <Header title="Картотека" />
                <div className="w-[390px] flex flex-col p-[24px] gap-[24px]">
                    <div className="w-full h-[48px] flex border rounded-[10px] gap-[8px] py-[13px] px-[8px]"><SearchInputIcon /><input type="text" placeholder="Введіть ім’я тварини або ID" className="w-full focus:outline-none" /></div>
                    <div className="w-full h-[44px] flex justify-between p-[4px]">
                        <Link href="#" onClick={toggleFilterPopup}>
                            <FilterIcon />
                        </Link>{filterPopupVisible && (
                            <div className="fixed inset-0 flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
                                <div className="w-full h-[24px] flex justify-end">
                                    <button onClick={toggleFilterPopup}><CloseBtb /></button>
                                </div>
                                <div className="w-full h-[36px] flex justify-center">
                                    <Header title="Фільтри" />
                                </div>

                                <div className="w-full flex flex-col items-start">
                                    {filters.map((filter, index) => (
                                        <div key={index} className="w-full flex flex-col items-start mt-4">
                                            <div className="w-full flex justify-between items-center">
                                                <h3 className="text-2xl font-semibold">{filter.title}</h3>
                                                <button onClick={() => toggleContent(index)} className="flex items-center">
                                                    <DownArrow className={contentVisibility[index] ? 'transform transition-transform duration-200 rotate-180' : ''} />
                                                </button>
                                            </div>
                                            {contentVisibility[index] && (
                                                <div className="mt-4 w-full">
                                                    {filter.content}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>


                            </div>
                        )}
                        <Link href="#" onClick={toggleSettingsPopup}>
                            <SetIcon />
                        </Link>
                        {settingsPopupVisible && (
                            <div>RR</div>
                        )}</div>
                </div>
            </section >
        </>
    )
}

export default CatalogCrm;
