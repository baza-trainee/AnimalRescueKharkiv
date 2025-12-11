"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { fetch } from "../../../utils/api";
import Link from "next/link";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_LATEST_PATH = process.env.NEXT_PUBLIC_API_ANIMALS_PATH; 
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Animal {
  id: string;
  name: string;
  origin: {
    origin__city: string;
    origin__arrival_date: string;
  };
  media?: {
    uri: string;
  }[];
}
export default function LastAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const fallbackImage = "/assets/imagescrm/сat.png";

useEffect(() => {
  const fetchAnimals = async () => {
    try {
      const params = new URLSearchParams();
      params.append("limit", "4");

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

 const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};

  
  return (
    <div className="w-[342px] overflow-hidden mx-auto shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)] border-[1px] border-solid border-mainBlue rounded-[10px] px-[16px] relative mb-[91px]">
      {/* <span className="absolute  bg-crm-backgraund w-full z-10 h-2 right-0 bottom-0"></span>
      <span className="absolute  bg-crm-backgraund w-[6.3%] z-10 h-full left-0 bottom-0"></span> */}

      <h3 className="font-semibold text-crm-black text-2xl leading-[35px] mb-4  mt-2">
        Останні поповнення:
      </h3>
      <Swiper
     className="w-[310px] mb-2"
  spaceBetween={16}
  slidesPerView="auto"
  loop={false}
  watchOverflow={true}
       
      >
        {animals.map((animal) => (
          
          <SwiperSlide
            key={animal.id}
            className="!w-[163px] shadow-[3px_4px_10px_rgba(182,187,235,0.3),-0px_-4px_10px_rgba(182,187,235,0.3)] mb-[1px]  relative">
            <Link href={`/crm/animals/${animal.id}`} >
              <div className="p-[4px]">
              <img src={
                    animal.media?.[0]?.uri
                    ? `${BASE_URL}${animal.media[0].uri}`
                    : fallbackImage
                  }
                  alt={animal.name} 
                  className="w-[155px] h-[161px] object-cover" 
              />
              <div className="">
                <p className="mt-2 mb-[2px] text-xl leading-[30px] font-normal --font-inter text-text">
                  {animal.name}
                </p>
                <p className="text-crm-secondary-blue font-normal text-sm mb-[2px]">ID{animal.id}</p>
                <p className="text-xl leading-[30px] font-normal text-text mb-[2px]">{animal.origin.origin__city|| "Невідомо"}</p>
                <p className="text-xl leading-[30px]  font-normal text-text">{formatDate(animal.origin.origin__arrival_date) || ""}</p>
              </div>
              </div>
              </Link>
            </SwiperSlide>
       
        ))}
      </Swiper>
    </div>
  );
};
