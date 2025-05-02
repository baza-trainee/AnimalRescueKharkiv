"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Header from "../Header";
import SearchInputIcon from "./CatalogCrmIcons/SearchInputIcon";
import FilterIcon from "./CatalogCrmIcons/FilterIcon";
import SetIcon from "./CatalogCrmIcons/Set";
import CloseBtb from "./CatalogCrmIcons/Closebtn";
import DownArrow from "./CatalogCrmIcons/DownArrow";
import { CustomDatePicker } from "../../ui/inputs/CustomDatePicker";
import { fetch } from "../../../utils/api";
import { Animal } from "@/src/app/types/animal";
import { format } from "date-fns";


const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LATEST_PATH = process.env.NEXT_PUBLIC_API_ANIMALS_PATH;
const API_LOCATIONS_PATH = process.env.NEXT_PUBLIC_API_LOCATIONS_PATH;
const API_ANIMAL_TYPE = process.env.NEXT_PUBLIC_API_ANIMAL_TYPES_PATH;
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
    const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filterPopupVisible, setFilterPopupVisible] = useState(false);
    const [sortingPopupVisible, setSortingPopupVisible] = useState(false);
    const { animals, fallbackImage, formatDate } = useAnimalsCatalog();
    const [sortOption, setSortOption] = useState<string>("");
    const [pendingSort, setPendingSort] = useState<string>("");
    const [currentLocations, setCurrentLocations] = useState<{ id: number; name: string }[]>([]);
    const [animalTypes, setAnimalTypes] = useState<{ id: number; name: string }[]>([]);
    const [selectedFilters, setSelectedFilters] = useState({
        search: "",
        arrivalDate: null as Date | null,
        city: "",
        animalType: [] as number[],
        gender: "",
        currentLocation: [] as number[],
        animalStatus: "",
        isMicrochipping: "",
        microchippingDate: null as Date | null,
        isSterilized: "",
        sterilizedDate: null as Date | null,
        isVaccinated: "",
        vaccinatedDate: null as Date | null,
    });

    // onClick на Popup фільтра
    const applyFilters = () => {
        setIsFiltering(true);
        setFilterPopupVisible(false);
    };

    // onClick на Popup сортування

    const applySorting = () => {
        setSortOption(pendingSort);
        setIsFiltering(true);
        setSortingPopupVisible(false);
    };

    // скидання фільтрів
    const resetFilters = () => {
        setIsFiltering(false);
        setFilteredAnimals([]);
        setFilterPopupVisible(false);
        setSelectedFilters({
            search: "",
            arrivalDate: null as Date | null,
            city: "",
            animalType: [] as number[],
            gender: "",
            currentLocation: [] as number[],
            animalStatus: "",
            isMicrochipping: "",
            microchippingDate: null as Date | null,
            isSterilized: "",
            sterilizedDate: null as Date | null,
            isVaccinated: "",
            vaccinatedDate: null as Date | null,
        })
    };

    const handleFilterChange = (key: keyof typeof selectedFilters, value: any) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleMultiSelectChange = (key: keyof typeof selectedFilters, value: number) => {
        setSelectedFilters((prev) => {
            const selectedArray = prev[key] as number[];
            const newArray = selectedArray.includes(value)
                ? selectedArray.filter((v) => v !== value)
                : [...selectedArray, value];

            return {
                ...prev,
                [key]: newArray,
            };
        });
    };

    // локації і типи
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locationsData, typesData] = await Promise.all([
                    fetch<{ id: number; name: string }[]>(`${API_CRM_PATH}${API_LOCATIONS_PATH}`),
                    fetch<{ id: number; name: string }[]>(`${API_CRM_PATH}${API_ANIMAL_TYPE}`)
                ]);

                // console.log("Локації:", locationsData);
                // console.log("Типи тварин:", typesData);

                setCurrentLocations(locationsData);
                setAnimalTypes(typesData);
            } catch (error) {
                console.error("Не вдалося завантажити дані", error);
            }
        };

        fetchData();
    }, []);


    // фільтри
    useEffect(() => {
        const fetchFilteredAnimals = async () => {
            const { arrivalDate, city, animalType, gender, currentLocation, animalStatus, isMicrochipping, microchippingDate, isSterilized, sterilizedDate, isVaccinated, vaccinatedDate } = selectedFilters;

            if (!arrivalDate && !city && !animalType && !gender && !currentLocation && !animalStatus && !isMicrochipping && !microchippingDate && !isSterilized && !sterilizedDate && !isVaccinated && !vaccinatedDate) return;

            const params = new URLSearchParams();

            if (arrivalDate) {
                const formattedDate = format(arrivalDate, "dd-MM-yyyy");
                params.append("arrival_date", formattedDate);
            }

            if (city) {
                params.append("city", city)
            }

            if (animalType.length > 0) {
                animalType.forEach((typeId) => {
                    params.append("animal_types", String(typeId))
                })
            }

            if (gender) {
                params.append("gender", gender)
            }

            if (currentLocation.length > 0) {
                currentLocation.forEach((locId) => {
                    params.append("current_locations", String(locId))
                })
            }

            if (animalStatus) {
                params.append("animal_state", animalStatus)
            }

            if (isMicrochipping) {
                params.append("is_microchpped", isMicrochipping)
            }

            if (microchippingDate) {
                const formattedDate = format(microchippingDate, "dd-MM-yyyy");
                params.append("microchpping_date", formattedDate);
            }

            if (isSterilized) {
                params.append("is_sterilized", isSterilized)
            }

            if (sterilizedDate) {
                const formattedDate = format(sterilizedDate, "dd-MM-yyyy");
                params.append("sterilization_date", formattedDate);
            }

            if (isVaccinated) {
                params.append("is_vaccinated", isVaccinated)
            }

            if (vaccinatedDate) {
                const formattedDate = format(vaccinatedDate, "dd-MM-yyyy");
                params.append("vaccination_date", formattedDate);
            }

            if (sortOption) {
                params.append("sort", sortOption);
            }

            try {
                const data = await fetch<Animal[]>(`${API_CRM_PATH}${API_LATEST_PATH}`, params);
                setFilteredAnimals(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsFiltering(false);
            }

        };

        if (isFiltering) {
            fetchFilteredAnimals();
        }



    }, [isFiltering, sortOption]);

    const visibleAnimals = useMemo(() => {
        const baseList = filteredAnimals.length > 0 ? filteredAnimals : animals;
        const search = selectedFilters.search?.toLowerCase().trim();

        if (!search) return baseList;

        return baseList.filter((animal) => {
            return (
                animal.name.toLowerCase().includes(search) ||
                animal.id.toLowerCase().includes(search)
            );
        });
    }, [animals, filteredAnimals, selectedFilters.search]);

    const filters = [
        {
            title: "Дата Прибуття",
            content: (
                <div>
                    <CustomDatePicker
                        selected={selectedFilters.arrivalDate}
                        onChange={(date) => handleFilterChange("arrivalDate", date)}
                        label="Оберіть дату"
                    />
                </div>
            ),
        },
        {
            title: "Звідки (місто)",
            content: (
                <div className="w-full h-[48px] flex item-center justify-center border rounded-[10px]">
                    <input
                        type="text"
                        value={selectedFilters.city}
                        onChange={(e) => handleFilterChange("city", e.target.value)}
                        placeholder="Введіть назву міста"
                        className="focus:outline-none" />
                </div>
            ),
        },
        {
            title: "Тип тварин",
            content: (
                <div className="w-full flex flex-wrap gap-4 font-medium">
                    {animalTypes.map((type) => (
                        <label key={type.id} className="w-100 flex items-center gap-[8px] text-lg">
                            <input
                                type="checkbox"
                                name="type"
                                value={type.id}
                                checked={selectedFilters.animalType.includes(type.id)}
                                onChange={(e) => handleMultiSelectChange("animalType", Number(e.target.value))}
                                id="checkbox1"
                                className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                            />
                            {type.name}
                        </label>
                    ))}

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
                            checked={selectedFilters.gender === "male"}
                            onChange={() => handleFilterChange("gender", "male")}
                            className="size-[20px] "
                        />
                    </label>
                    <label className="w-full flex items-center gap-[4px]">
                        Жін
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={selectedFilters.gender === "female"}
                            onChange={() => handleFilterChange("gender", "female")}
                            className="size-[20px]"
                        />
                    </label>
                </div>
            ),
        },
        {
            title: "Поточна локація",
            content: (
                <div className="w-full flex flex-wrap gap-4 font-medium my-3">
                    {currentLocations.map((location) => (
                        <label key={location.id} className="w-100 flex items-center gap-[8px] text-lg">
                            <input
                                type="checkbox"
                                name="currentlocation"
                                value={location.id}
                                checked={selectedFilters.currentLocation.includes(location.id)}
                                onChange={(e) => handleMultiSelectChange("currentLocation", Number(e.target.value))}
                                id="checkbox1"
                                className="appearance-none size-[20px] border rounded-[4px] border-mainBlue checked:bg-mainBlue"
                            />
                            {location.name}
                        </label>
                    ))}
                </div>
            ),
        },
        {
            title: "Статус", // Є (dead 404)
            content: (
                <div className="w-full flex flex-col items-center justify-start gap-4  font-medium">
                    <div className="w-full flex flex-col gap-4 text-lg my-3">
                        <label className="w-full flex items-center gap-1">
                            Активні
                            <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={selectedFilters.animalStatus === "active"}
                                onChange={(e) => handleFilterChange("animalStatus", e.target.value as "active" | "dead" | "adopted")}
                                className="size-[20px] "
                            />
                        </label>
                        <label className="w-full flex items-center gap-1">
                            Померлі
                            <input
                                type="radio"
                                name="status"
                                value="dead"
                                checked={selectedFilters.animalStatus === "dead"}
                                onChange={(e) => handleFilterChange("animalStatus", e.target.value as "active" | "dead" | "adopted")}
                                className="size-[20px]"
                            />
                        </label>
                        <label className="w-full flex items-center gap-1">
                            Прилаштовані
                            <input
                                type="radio"
                                name="status"
                                value="adopted"
                                checked={selectedFilters.animalStatus === "adopted"}
                                onChange={(e) => handleFilterChange("animalStatus", e.target.value as "active" | "dead" | "adopted")}
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
                                    checked={selectedFilters.isMicrochipping === "true"}
                                    onChange={(e) => handleFilterChange("isMicrochipping", e.target.value as "true" | "false")}
                                    className="size-[20px] "
                                />
                            </label>
                            <label className="w-full flex items-center gap-[4px]">
                                Ні
                                <input
                                    type="radio"
                                    name="chipping"
                                    value="false"
                                    checked={selectedFilters.isMicrochipping === "false"}
                                    onChange={(e) => handleFilterChange("isMicrochipping", e.target.value as "true" | "false")}
                                    className="size-[20px]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Дата проведення</span>
                        <CustomDatePicker
                            selected={selectedFilters.microchippingDate}
                            onChange={(date) => handleFilterChange("microchippingDate", date)}
                            label=""
                        />
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
                                    checked={selectedFilters.isSterilized === "true"}
                                    onChange={(e) => handleFilterChange("isSterilized", e.target.value as "true" | "false")}
                                    className="size-[20px] "
                                />
                            </label>
                            <label className="w-full flex items-center gap-[4px]">
                                Ні
                                <input
                                    type="radio"
                                    name="sterelization"
                                    value="false"
                                    checked={selectedFilters.isSterilized === "false"}
                                    onChange={(e) => handleFilterChange("isSterilized", e.target.value as "true" | "false")}
                                    className="size-[20px]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Дата проведення</span>
                        <CustomDatePicker
                            selected={selectedFilters.sterilizedDate}
                            onChange={(date) => handleFilterChange("sterilizedDate", date)}
                            label=""
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
                                    checked={selectedFilters.isVaccinated === "true"}
                                    onChange={(e) => handleFilterChange("isVaccinated", e.target.value as "true" | "false")}
                                    className="size-[20px] "
                                />
                            </label>
                            <label className="w-full flex items-center gap-[4px]">
                                Ні
                                <input
                                    type="radio"
                                    name="vaccination"
                                    value="false"
                                    checked={selectedFilters.isVaccinated === "false"}
                                    onChange={(e) => handleFilterChange("isVaccinated", e.target.value as "true" | "false")}
                                    className="size-[20px]"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start">
                        <span className="text-lg">Дата проведення</span>
                        <CustomDatePicker
                            selected={selectedFilters.vaccinatedDate}
                            onChange={(date) => handleFilterChange("vaccinatedDate", date)}
                            label=""
                        />
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
                            onChange={(e) => setSelectedFilters(prev => ({ ...prev, search: e.target.value }))}
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
                                                    value="created_at|desc"
                                                    checked={pendingSort === "created_at|desc"}
                                                    onChange={(e) => setPendingSort(e.target.value as typeof sortOption)}
                                                    className="size-[20px] "
                                                />
                                                Від найновіших
                                            </label>
                                            <label
                                                className="w-full flex items-center gap-[4px] text-lg font-medium
                                ">
                                                <input
                                                    type="radio"
                                                    name="sorting"
                                                    value="created_at|asc"
                                                    checked={pendingSort === "created_at|asc"}
                                                    onChange={(e) => setPendingSort(e.target.value as typeof sortOption)}
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
                                                    name="sorting"
                                                    value="name|asc"
                                                    className="size-[20px] "
                                                    checked={pendingSort === "name|asc"}
                                                    onChange={(e) => setPendingSort(e.target.value as typeof sortOption)}
                                                />
                                                А-Я
                                            </label>
                                            <label
                                                className="w-full flex items-center gap-[4px] text-lg font-medium
                                ">
                                                <input
                                                    type="radio"
                                                    name="sorting"
                                                    value="name|desc"
                                                    className="size-[20px] "
                                                    checked={pendingSort === "name|desc"}
                                                    onChange={(e) => setPendingSort(e.target.value as typeof sortOption)}
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
                            {visibleAnimals.map((animal) => (
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
