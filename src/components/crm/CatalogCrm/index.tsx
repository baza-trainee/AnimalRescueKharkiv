"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Header from "../Header";
import SearchInputIcon from "./CatalogCrmIcons/SearchInputIcon";
import FilterIcon from "./CatalogCrmIcons/FilterIcon";
import SetIcon from "./CatalogCrmIcons/Set";
import CloseBtb from "./CatalogCrmIcons/Closebtn";
import DownArrow from "./CatalogCrmIcons/DownArrow";
import DateInput from "./Dateinput";
import { fetch } from "../../../utils/api";
import { Animal } from "@/src/app/types/animal";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LATEST_PATH = process.env.NEXT_PUBLIC_API_ANIMALS_PATH;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useAnimalsCatalog() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const fallbackImage = "/assets/imagescrm/сat.png";

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const params = new URLSearchParams();

                const data = await fetch<Animal[]>(
                    `${API_CRM_PATH}${API_LATEST_PATH}`,
                    params
                );

                setAnimals(data);
            } catch (err) {
                console.error("Помилка при завантаженні тварин:", err);
            }
        };

        fetchAnimals();
    }, []);

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "";

        const [day, month, year] = dateStr.split("/");
        if (!day || !month || !year) return "";

        return `${day}.${month}`;
    };

    return { animals, fallbackImage, formatDate };
}
// обробник кліку по карточці:
const handleCardClick = (animal: Animal) => {
    console.log("Клік по:", animal);
};

const CatalogCrm: React.FC = () => {
    const [isFiltering, setIsFiltering] = useState(false);
    const [filterPopupVisible, setFilterPopupVisible] = useState(false);
    const [sortingPopupVisible, setSortingPopupVisible] = useState(false);
    const { animals, fallbackImage, formatDate } = useAnimalsCatalog();
    const [sortType, setSortType] = useState<"date-new" | "date-old" | "name-asc" | "name-desc">("date-new");
    const [pendingSort, setPendingSort] = useState<typeof sortType>(sortType);
    const [selectedFilters, setSelectedFilters] = useState({
        search: '',
        id: '',
        name: '',
        date: '',
        fromCity: '',
        type: [] as string[],
        gender: '',
        location: [] as string[],
        animal_status: '',
        microchipping: '',
        microchipping_date: '',
        sterilization: '',
        sterilization_date: '',
        vaccination: '',
        vaccination_date: ''
    });


    // onClick на Popup фільтра
    const applyFilters = () => {
        setIsFiltering(true);
        setFilterPopupVisible(false);
    };

    // onClick на Popup сортування
    const applySorting = () => {
        setSortType(pendingSort);
        setSortingPopupVisible(false);
    };

    // скидання фільтрів
    const resetFilters = () => {
        setSelectedFilters({
            search: '',
            id: '',
            name: '',
            date: '',
            fromCity: '',
            type: [] as string[],
            gender: '',
            location: [] as string[],
            animal_status: '',
            microchipping: '',
            microchipping_date: '',
            sterilization: '',
            sterilization_date: '',
            vaccination: '',
            vaccination_date: ''
        });
        setIsFiltering(false);
        setFilterPopupVisible(false);
    };

    const handleSearchChange = (value: string) => {
        setSelectedFilters((prev) => ({
            ...prev,
            search: value,
        }));
        setIsFiltering(true);
    };


    const parseDateSlash = (dateString: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day);
    };

    const parseDateDash = (dateString: string) => {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    };


    const handleDateChange = (date: Date | null) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            handleFilterChange("date", formattedDate);
        } else {
            handleFilterChange("date", "");
        }
    };

    const handleChippingDateChange = (date: Date | null) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            handleFilterChange("microchipping_date", formattedDate);
        } else {
            handleFilterChange("microchipping_date", "");
        }
    };

    const handleSterelizationDateChange = (date: Date | null) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            handleFilterChange("sterilization_date", formattedDate);
        } else {
            handleFilterChange("sterilization_date", "");
        }
    };

    const handleVaccinationDateChange = (date: Date | null) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${year}-${month}-${day}`;
            handleFilterChange("vaccination_date", formattedDate);
        } else {
            handleFilterChange("vaccination_date", "");
        }
    };

    const handleTypeChange = (value: string) => {
        setSelectedFilters((prev) => {
            const updatedType = prev.type.includes(value)
                ? prev.type.filter((type) => type !== value)
                : [...prev.type, value];

            return {
                ...prev,
                type: updatedType,
            };
        });
    };

    const handleLocationChange = (value: string) => {
        setSelectedFilters((prev) => {
            const updatedLocation = prev.location.includes(value)
                ? prev.location.filter((location) => location !== value)
                : [...prev.location, value];

            return {
                ...prev,
                location: updatedLocation,
            };
        });
    };

    const handleFilterChange = (field: keyof FiltersType, value: any) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
        setIsFiltering(true);
    };

    // useMemo для фільтрів і сортування
    const catalogAnimals = useMemo(() => {
        const baseAnimals = isFiltering
            ? animals.filter((animal) => {
                const matchSearch = selectedFilters.search
                    ? animal.id.toLowerCase().includes(selectedFilters.search.toLowerCase()) ||
                    animal.name.toLowerCase().includes(selectedFilters.search.toLowerCase())
                    : true;

                const matchDate = selectedFilters.date
                    ? (animal.origin.origin__arrival_date === selectedFilters.date)
                    : true;

                const matchCity = selectedFilters.fromCity
                    ? animal.origin.origin__city.toLowerCase().includes(selectedFilters.fromCity.toLowerCase())
                    : true;

                const matchType = selectedFilters.type.length > 0
                    ? selectedFilters.type.some(
                        (type) =>
                            type.toLowerCase() ===
                            animal.general.general__animal_type.name.toLowerCase()
                    )
                    : true;

                const matchGender = selectedFilters.gender
                    ? animal.general.general__gender === selectedFilters.gender
                    : true;

                const matchLocation = selectedFilters.location.length > 0
                    ? selectedFilters.location.some(
                        (location) =>
                            location.toLowerCase() ===
                            animal.current_location.location.name.toLowerCase()
                    )
                    : true;

                const matchStatus = selectedFilters.animal_status !== ""
                    ? (selectedFilters.animal_status === "active" && animal.death.death__dead === false) ||
                    (selectedFilters.animal_status === "death" && animal.death.death__dead === true) ||
                    (selectedFilters.animal_status === "placed" && animal.death.death__dead === true)
                    : true;

                const matchChipping = selectedFilters.microchipping !== ""
                    ? (selectedFilters.microchipping === "true" && animal.microchipping.microchipping__done === true) ||
                    (selectedFilters.microchipping === "false" && animal.microchipping.microchipping__done === false)
                    : true;

                const matchChippingData = selectedFilters.microchipping_date
                    ? animal.microchipping.microchipping__date === selectedFilters.microchipping_date
                    : true;

                const matchSterilization = selectedFilters.sterilization !== ""
                    ? (selectedFilters.sterilization === "true" && animal.sterilization.sterilization__done === true) ||
                    (selectedFilters.sterilization === "false" && animal.sterilization.sterilization__done === false)
                    : true;

                const matchSterilizationData = selectedFilters.sterilization_date
                    ? animal.sterilization.sterilization__date === selectedFilters.sterilization_date
                    : true;

                const matchVaccination = selectedFilters.vaccination !== ""
                    ? (selectedFilters.vaccination === "true" &&
                        animal.vaccinations?.some((v) => v.is_vaccinated === true)) ||
                    (selectedFilters.vaccination === "false" &&
                        (animal.vaccinations?.every((v) => v.is_vaccinated === false) ||
                            animal.vaccinations?.length === 0))
                    : true;

                const matchVaccinationData = selectedFilters.vaccination_date
                    ? animal.vaccinations?.some(
                        (vaccination) =>
                            vaccination.date && vaccination.date === selectedFilters.vaccination_date
                    )
                    : true;

                return (
                    matchSearch &&
                    matchDate &&
                    matchCity &&
                    matchType &&
                    matchGender &&
                    matchLocation &&
                    matchStatus &&
                    matchChipping &&
                    matchChippingData &&
                    matchSterilization &&
                    matchSterilizationData &&
                    matchVaccination &&
                    matchVaccinationData
                );
            })
            : animals;

        const sorted = [...baseAnimals];
        const getDate = (date: string | null): number => {
            return date ? parseDateSlash(date).getTime() : 0;
        };


        switch (sortType) {
            case "date-new":
                return sorted.sort(
                    (a, b) =>
                        getDate(b.origin.origin__arrival_date) - getDate(a.origin.origin__arrival_date)
                );
            case "date-old":
                return sorted.sort(
                    (a, b) =>
                        getDate(a.origin.origin__arrival_date) - getDate(b.origin.origin__arrival_date)
                );

            case "name-asc":
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case "name-desc":
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sorted;
        }
    }, [animals, selectedFilters, isFiltering, sortType]);

    const filters = [
        {
            title: "Дата Прибуття", // Є
            content: (
                <div>
                    <DateInput
                        selectedDate={selectedFilters.date ? parseDateSlash(selectedFilters.date) : null}
                        onChange={handleDateChange}
                    />
                </div>
            ),
        },
        {
            title: "Звідки (місто)", // Є
            content: (
                <div className="w-full h-[48px] flex item-center justify-center border rounded-[10px]">
                    <input
                        type="text"
                        value={selectedFilters.fromCity}
                        onChange={(e) => handleFilterChange("fromCity", e.target.value)}
                        placeholder="Введіть назву міста"
                        className="focus:outline-none" />
                </div>
            ),
        },
        {
            title: "Тип тварин", // Є
            content: (
                <div className="w-full flex flex-wrap gap-4 font-medium">
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Кіт"
                            checked={selectedFilters.type.includes("Кіт")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox1"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Кіт
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Собака"
                            checked={selectedFilters.type.includes("Собака")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox2"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Собака
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Кінь"
                            checked={selectedFilters.type.includes("Кінь")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox3"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Коні
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Корова"
                            checked={selectedFilters.type.includes("Корова")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox4"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Корова
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Коза"
                            checked={selectedFilters.type.includes("Коза")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox5"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Кози
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Кролі"
                            checked={selectedFilters.type.includes("Кролі")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox6"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Кролі
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Птахи"
                            checked={selectedFilters.type.includes("Птахи")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox7"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Птахи
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Лис"
                            checked={selectedFilters.type.includes("Лис")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            id="checkbox8"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Лисиці
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="type"
                            value="Інші"
                            id="checkbox9"
                            checked={selectedFilters.type.includes("Інші")}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Інші
                    </label>
                </div>
            ),
        },
        {
            title: "Стать",
            content: (
                <div className="w-full flex items-center justify-center text-lg font-medium">
                    <label className="w-full flex items-center gap-[4px]">
                        Чол
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="size-[20px] "
                            checked={selectedFilters.gender === "male"}
                            onChange={(e) => handleFilterChange("gender", e.target.value as "male" | "female")}
                        />
                    </label>
                    <label className="w-full flex items-center gap-[4px]">
                        Жін
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="size-[20px]"
                            checked={selectedFilters.gender === "female"}
                            onChange={(e) => handleFilterChange("gender", e.target.value as "male" | "female")}
                        />
                    </label>
                </div>
            ),
        },
        {
            title: "Поточна локація",
            content: (
                <div className="w-full flex flex-wrap gap-4 font-medium my-3">
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Клініка"
                            checked={selectedFilters.location.includes("Клініка")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox1"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Клініка
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Іподром"
                            checked={selectedFilters.location.includes("Іподром")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox2"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Іподром
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Есеніна"
                            checked={selectedFilters.location.includes("Есеніна")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox3"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Есеніна
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Перетримка Зоя"
                            checked={selectedFilters.location.includes("Перетримка Зоя")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox4"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Перетримка Зоя
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Перетримка Яна"
                            checked={selectedFilters.location.includes("Перетримка Яна")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox5"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Перетримка Яна
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Перетримка Марина"
                            checked={selectedFilters.location.includes("Перетримка Марина")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox6"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Перетримка Марина
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Бабаї"
                            checked={selectedFilters.location.includes("Бабаї")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox7"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Бабаї
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Жихор"
                            checked={selectedFilters.location.includes("Жихор")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox8"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Жихор
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Первомайськ"
                            checked={selectedFilters.location.includes("Первомайськ")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox9"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Первомайськ
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Войтенко"
                            checked={selectedFilters.location.includes("Войтенко")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox9"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Войтенко
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Павлиш"
                            checked={selectedFilters.location.includes("Павлиш")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox9"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Павлиш
                    </label>
                    <label className="w-100 flex items-center gap-[8px] text-lg">
                        <input
                            type="checkbox"
                            name="currentlocation"
                            value="Інше"
                            checked={selectedFilters.location.includes("Інше")}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            id="checkbox9"
                            className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                        />
                        Інше
                    </label>
                </div>
            ),
        },
        {
            title: "Статус", // Є треба взнати про Placed
            content: (
                <div className="w-full flex flex-col items-center justify-start gap-4  font-medium">
                    <div className="w-full flex flex-col gap-4 text-lg my-3">
                        <label className="w-full flex items-center gap-1">
                            Активні
                            <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={selectedFilters.animal_status === "active"}
                                onChange={(e) => handleFilterChange("animal_status", e.target.value as "active" | "death" | "placed")}
                                className="size-[20px] "
                            />
                        </label>
                        <label className="w-full flex items-center gap-1">
                            Померлі
                            <input
                                type="radio"
                                name="status"
                                value="death"
                                checked={selectedFilters.animal_status === "death"}
                                onChange={(e) => handleFilterChange("animal_status", e.target.value as "active" | "death" | "placed")}
                                className="size-[20px]"
                            />
                        </label>
                        <label className="w-full flex items-center gap-1">
                            Прилаштовані
                            <input
                                type="radio"
                                name="status"
                                value="placed"
                                checked={selectedFilters.animal_status === "placed"}
                                onChange={(e) => handleFilterChange("animal_status", e.target.value as "active" | "death" | "placed")}
                                className="size-[20px]"
                            />
                        </label>
                    </div>
                </div>
            ),
        },
        {
            title: "Чіпування",
            content: (
                <div className="w-full flex flex-col items-center justify-start gap-4  font-medium">
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Проведено?</span>
                        <div className="w-full flex text-lg">
                            <label className="w-full flex items-center gap-[4px]">
                                Так
                                <input
                                    type="radio"
                                    name="chipping"
                                    value="true"
                                    checked={selectedFilters.microchipping === "true"}
                                    onChange={(e) => handleFilterChange("microchipping", e.target.value as "true" | "false")}
                                    className="size-[20px] "
                                />
                            </label>
                            <label className="w-full flex items-center gap-[4px]">
                                Ні
                                <input
                                    type="radio"
                                    name="chipping"
                                    value="false"
                                    checked={selectedFilters.microchipping === "false"}
                                    onChange={(e) => handleFilterChange("microchipping", e.target.value as "true" | "false")}
                                    className="size-[20px]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Дата проведення</span>
                        <DateInput selectedDate={selectedFilters.microchipping_date ? parseDateSlash(selectedFilters.microchipping_date) : null} onChange={handleChippingDateChange} />
                    </div>
                </div>
            ),
        },
        {
            title: "Стерелізація/кастрація",
            content: (
                <div className="w-full flex flex-col items-center justify-start gap-4  font-medium">
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Проведено?</span>
                        <div className="w-full flex text-lg">
                            <label className="w-full flex items-center gap-[4px]">
                                Так
                                <input
                                    type="radio"
                                    name="sterelization"
                                    value="true"
                                    checked={selectedFilters.sterilization === "true"}
                                    onChange={(e) => handleFilterChange("sterilization", e.target.value as "true" | "false")}
                                    className="size-[20px] "
                                />
                            </label>
                            <label className="w-full flex items-center gap-[4px]">
                                Ні
                                <input
                                    type="radio"
                                    name="sterelization"
                                    value="false"
                                    checked={selectedFilters.sterilization === "false"}
                                    onChange={(e) => handleFilterChange("sterilization", e.target.value as "true" | "false")}
                                    className="size-[20px]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Дата проведення</span>
                        <DateInput
                            selectedDate={selectedFilters.sterilization_date ? parseDateSlash(selectedFilters.sterilization_date) : null}
                            onChange={handleSterelizationDateChange}
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Вакцинація",
            content: (
                <div className="w-full flex flex-col items-center justify-start gap-4  font-medium">
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Проведено?</span>
                        <div className="w-full flex text-lg">
                            <label className="w-full flex items-center gap-[4px]">
                                Так
                                <input
                                    type="radio"
                                    name="vaccination"
                                    value="true"
                                    checked={selectedFilters.vaccination === "true"}
                                    onChange={(e) => handleFilterChange("vaccination", e.target.value as "true" | "false")}
                                    className="size-[20px] "
                                />
                            </label>
                            <label className="w-full flex items-center gap-[4px]">
                                Ні
                                <input
                                    type="radio"
                                    name="vaccination"
                                    value="false"
                                    checked={selectedFilters.vaccination === "false"}
                                    onChange={(e) => handleFilterChange("vaccination", e.target.value as "true" | "false")}
                                    className="size-[20px]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Дата проведення</span>
                        <DateInput selectedDate={selectedFilters.vaccination_date ? parseDateDash(selectedFilters.vaccination_date) : null} onChange={handleVaccinationDateChange} />
                    </div>
                </div>
            ),
        },
    ];

    const [contentVisibility, setContentVisibility] = useState(
        Array(filters.length).fill(false)
    );

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
        });
    };

    return (
        <>
            <section>
                <Header title="Картотека" />
                <div className="w-[390px] flex flex-col p-[20px] gap-[24px]">
                    <div className="w-full h-[48px] flex border rounded-[10px] gap-[8px] py-[13px] px-[8px]">
                        <SearchInputIcon />
                        <input
                            type="text"
                            value={selectedFilters.search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Введіть ім’я тварини або ID"
                            className="w-full focus:outline-none"
                        />
                    </div>
                    <div className="w-full h-[44px] flex justify-between p-[4px] z-40">
                        <Link href="#" onClick={toggleFilterPopup}>
                            <FilterIcon />
                        </Link>
                        {filterPopupVisible && (
                            <div className="fixed inset-0 flex items-start justify-center">
                                <div className="w-[390px] h-[calc(100vh-67px)] flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
                                    <div className="w-full h-[24px] flex justify-end">
                                        <button onClick={toggleFilterPopup}>
                                            <CloseBtb />
                                        </button>
                                    </div>
                                    <div className="w-full h-[36px] flex justify-center">
                                        <Header title="Фільтри" />
                                    </div>
                                    <div className="w-full flex flex-col items-start">
                                        {filters.map((filter, index) => (
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
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-col gap-[8px] mt-[8px] text-xl">
                                        <button type="reset" onClick={resetFilters} className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-mainBlue">
                                            Скинути фільтри
                                        </button>
                                        <button onClick={applyFilters} className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-white bg-mainBlue">
                                            Показати картки
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Link href="#" onClick={toggleSortingPopup}>
                            <SetIcon />
                        </Link>
                        {sortingPopupVisible && (
                            <div className="fixed inset-0 flex items-start justify-center">
                                <div className="w-[390px] flex flex-col content-center justify-start bg-white py-[16px] px-[24px] gap-[8px] overflow-auto">
                                    <div className="w-full h-[24px] flex justify-end">
                                        <button onClick={toggleSortingPopup}>
                                            <CloseBtb />
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-col justify-center gap-4">
                                        <div className="w-full flex flex-col justify-start gap-[11px]">
                                            <h3 className="text-2xl font-semibold">Датою</h3>
                                            <label
                                                className="w-full flex items-center gap-[4px] text-lg font-medium
                                ">
                                                <input
                                                    type="radio"
                                                    name="sorting"
                                                    value="date-new"
                                                    className="size-[20px] "
                                                    checked={pendingSort === "date-new"}
                                                    onChange={() => setPendingSort("date-new")}
                                                />
                                                Від найновіших
                                            </label>
                                            <label
                                                className="w-full flex items-center gap-[4px] text-lg font-medium
                                ">
                                                <input
                                                    type="radio"
                                                    name="sorting"
                                                    value="date-old"
                                                    className="size-[20px] "
                                                    checked={pendingSort === "date-old"}
                                                    onChange={() => setPendingSort("date-old")}
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
                                                    name="sorting"
                                                    value="name-asc"
                                                    className="size-[20px] "
                                                    checked={pendingSort === "name-asc"}
                                                    onChange={() => setPendingSort("name-asc")}
                                                />
                                                А-Я
                                            </label>
                                            <label
                                                className="w-full flex items-center gap-[4px] text-lg font-medium
                                ">
                                                <input
                                                    type="radio"
                                                    name="sorting"
                                                    value="name-desc"
                                                    className="size-[20px] "
                                                    checked={pendingSort === "name-desc"}
                                                    onChange={() => setPendingSort("name-desc")}
                                                />
                                                Я-А
                                            </label>
                                        </div>
                                        <button onClick={applySorting} className="w-full h-[56px] border border-mainBlue rounded-[10px] font-normal text-xl text-white bg-mainBlue">
                                            Застосувати
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="w-full flex flex-wrap gap-4 m-auto pb-14">
                            {catalogAnimals.map((animal) => (
                                <div key={animal.id} className="!w-[163px]  shadow-[1px_1px_5px_rgba(182,187,235,0.3),-0px_-4px_10px_rgba(182,187,235,0.3)] mb-2 relative" onClick={() => handleCardClick(animal)}>
                                    <div className="p-1">
                                        <img src={
                                            animal.media?.[0]?.uri
                                                ? `${BASE_URL}${animal.media[0].uri}`
                                                : fallbackImage
                                        }
                                            alt={animal.name}
                                            className="w-[155px] h-[161px] object-cover"
                                        />
                                        <div className="pl-1">
                                            <p className="mt-2 text-xl font-normal --font-inter text-text">
                                                {animal.name}
                                            </p>
                                            <p className="text-crm-secondary-blue font-normal text-sm">ID{animal.id}</p>
                                            <p className="text-xl font-normal text-text">{animal.origin.origin__city || "Невідомо"}</p>
                                            <p className="text-xl font-normal text-text">{formatDate(animal.origin.origin__arrival_date) || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CatalogCrm;
