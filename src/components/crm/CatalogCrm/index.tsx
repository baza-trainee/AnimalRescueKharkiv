"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Header from "../Header";
import SearchInputIcon from "./CatalogCrmIcons/SearchInputIcon";
import FilterIcon from "./CatalogCrmIcons/FilterIcon";
import SetIcon from "./CatalogCrmIcons/Set";
import CloseBtb from "./CatalogCrmIcons/Closebtn";
import DownArrow from "./CatalogCrmIcons/DownArrow";
import DateInput from "./Dateinput";



const CatalogCrm: React.FC = () => {
    const [filterPopupVisible, setFilterPopupVisible] = useState(false);
    const [sortingPopupVisible, setSortingPopupVisible] = useState(false);


    const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
    const [deathDate, setDeathDate] = useState<Date | null>(null);
    const [chipDate, setChipDate] = useState<Date | null>(null);
    const [sterilizationDate, setSterilizationDate] = useState<Date | null>(null);
    const [vaccineDate, setVaccineDate] = useState<Date | null>(null);



    const filters = [
        {
            title: 'Дата Прибуття', content: <div>
                <DateInput selectedDate={arrivalDate} onChange={setArrivalDate} />
            </div>
        },
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
            title: 'Смерть', content: <div className="w-full flex flex-col items-center justify-start gap-[16px]  font-medium">
                <div className="w-full flex text-lg">
                    <label className="w-full flex items-center gap-[4px]">Так<input type="radio" name="death" value="yes" className="size-[20px] " /></label>
                    <label className="w-full flex items-center gap-[4px]">Ні<input type="radio" name="death" value="no" className="size-[20px]" /></label>
                </div>
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Дата</span>
                    <DateInput selectedDate={deathDate} onChange={setDeathDate} />
                </div>

            </div>
        },
        {
            title: 'Чіпування', content: <div className="w-full flex flex-col items-center justify-start gap-[16px]  font-medium">
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Проведено?</span>
                    <div className="w-full flex text-lg">
                        <label className="w-full flex items-center gap-[4px]">Так<input type="radio" name="chip" value="yes" className="size-[20px] " /></label>
                        <label className="w-full flex items-center gap-[4px]">Ні<input type="radio" name="chip" value="no" className="size-[20px]" /></label>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Дата проведення</span>
                    <DateInput selectedDate={chipDate} onChange={setChipDate} />
                </div>

            </div>
        },
        {
            title: 'Стерелізація/кастрація', content: <div className="w-full flex flex-col items-center justify-start gap-[16px]  font-medium">
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Проведено?</span>
                    <div className="w-full flex text-lg">
                        <label className="w-full flex items-center gap-[4px]">Так<input type="radio" name="chip" value="yes" className="size-[20px] " /></label>
                        <label className="w-full flex items-center gap-[4px]">Ні<input type="radio" name="chip" value="no" className="size-[20px]" /></label>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Дата проведення</span>
                    <DateInput selectedDate={sterilizationDate} onChange={setSterilizationDate} />
                </div>

            </div>
        },
        {
            title: 'Вакцинація', content: <div className="w-full flex flex-col items-center justify-start gap-[16px]  font-medium">
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Проведено?</span>
                    <div className="w-full flex text-lg">
                        <label className="w-full flex items-center gap-[4px]">Так<input type="radio" name="chip" value="yes" className="size-[20px] " /></label>
                        <label className="w-full flex items-center gap-[4px]">Ні<input type="radio" name="chip" value="no" className="size-[20px]" /></label>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start">
                    <span className="text-lg">Дата проведення</span>
                    <DateInput selectedDate={vaccineDate} onChange={setVaccineDate} />
                </div>

            </div>
        },


    ];

    const [contentVisibility, setContentVisibility] = useState(Array(filters.length).fill(false));

    const toggleFilterPopup = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setFilterPopupVisible(!filterPopupVisible);
    };

    const toggleSortingPopup = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setSortingPopupVisible(!sortingPopupVisible);
    };

    const toggleContent = (index: number) => {
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
                <div className="w-[390px] flex flex-col p-[20px] gap-[24px]">
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
                                            <div className="w-full flex justify-between items-center" onClick={() => toggleContent(index)}>
                                                <h3 className="text-2xl font-semibold cursor-pointer" >{filter.title}</h3>
                                                <button className="flex items-center">
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

                                <div className="w-full flex flex-col gap-[8px] mt-[8px] text-xl">
                                    <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-mainBlue">Скинути фільтри</button>
                                    <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-white bg-mainBlue">Показати картки</button>
                                </div>
                            </div>
                        )}
                        <Link href="#" onClick={toggleSortingPopup}>
                            <SetIcon />
                        </Link>
                        {sortingPopupVisible && (
                            <div className="fixed inset-0 flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
                                <div className="w-full h-[24px] flex justify-end">
                                    <button onClick={toggleSortingPopup}><CloseBtb /></button>
                                </div>
                                <div className="w-full flex flex-col justify-center gap-[16px]">
                                    <div className="w-full flex flex-col justify-start gap-[11px]">
                                        <h3 className="text-2xl font-semibold">Датою</h3>
                                        <label className="w-full flex items-center gap-[4px] text-lg font-medium
"><input type="radio" name="sortingdate" value="new" className="size-[20px] " />Від найновіших</label>
                                        <label className="w-full flex items-center gap-[4px] text-lg font-medium
"><input type="radio" name="sortingdate" value="old" className="size-[20px] " />Від найстарших</label>
                                    </div>
                                    <div className="w-full flex flex-col justify-start gap-[11px]">
                                        <h3 className="text-2xl font-semibold">Алфавітом</h3>
                                        <label className="w-full flex items-center gap-[4px] text-lg font-medium
"><input type="radio" name="sortingalphabet" value="az" className="size-[20px] " />А-Я</label>
                                        <label className="w-full flex items-center gap-[4px] text-lg font-medium
"><input type="radio" name="sortingalphabet" value="za" className="size-[20px] " />Я-А</label>
                                    </div>
                                    <button className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-xl text-white bg-mainBlue">Застосувати</button>
                                </div>
                            </div>
                        )}</div>
                    <div>
                        Картотека
                    </div>
                </div>
            </section >
        </>
    )
}

export default CatalogCrm;
