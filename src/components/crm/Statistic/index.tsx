"use client";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { isSameMonth, isSameYear } from "date-fns";
import { fetch } from "../../../utils/api";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { CustomDatePicker } from "../../ui/inputs/CustomDatePicker";


const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_STATS_PATH = process.env.NEXT_PUBLIC_API_STATS_PATH;

interface ApiResponse {
  sterilized: number;
  adopted: number;
  dead: number;
  total: number;
}


const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo); 
  const [endDate, setEndDate] = useState<Date | null>(today);
   const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["arkStats", startDate, endDate],
    queryFn: () => {
      const formattedStartDate = startDate ? format(startDate, "dd/MM/yyyy") : undefined;
      const formattedEndDate = endDate ? format(endDate, "dd/MM/yyyy") : undefined;

      return fetch<ApiResponse>(`${API_CRM_PATH}${API_STATS_PATH}/animals`, {
        from_date: formattedStartDate,
        to_date: formattedEndDate,
      });
    },
  });
  return (
      <div className=" container">
          <div className="flex flex-row justify-between w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
              <div className="--font-inter font-semibold text-2xl leading-9 text-crm-black">Всього тварин в АRK </div>
              <div className="--font-inter font-semibold text-2xl leading-9 text-center text-mainBlue">{data?.total ?? "..."}</div>          
          </div>
        
      <h2 className="--font-inter w-[342px] ml-6 mr-6 font-medium text-2xl leading-9 text-crm-black text-center mb-4">Статистика по ARK</h2>
          < div className="flex flex-row gap-4 w-auto mb-6 ml-6 mr-6 mt-4">
        <div className=" w-[163px]">
          <CustomDatePicker
  label="З"
  selected={startDate}
  onChange={(date: Date | null) => {
    if (date && endDate && date > endDate) return; 
    setStartDate(date);
  }}
  maxDate={endDate ?? today} 
/>
        </div>
         
        <div className="w-[163px]">
          <CustomDatePicker
            label="По"
            selected={endDate}
             onChange={(date) => {
    if (date && startDate && date < startDate) return; 
    setEndDate(date);
  }}
            minDate={startDate ?? undefined}   
            maxDate={today}          
          />
        </div>
        
      </div>
      {isLoading ? (
        <p>Завантаження даних...</p>
      ) : isError ? (
        <p>Помилка завантаження даних</p>
      ) : (
        <div className="flex flex-col gap-1 w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
          <div className="flex flex-row justify-between py-0 px-1 shadow-statistic w-[310px] h-[30px] bg-crm-backgraund">
            <h3 className="--font-inter font-normal text-xl text-crm-black">
              Стерилізовано
            </h3>
            <p className="--font-inter font-normal text-xl text-mainBlue">
             {data?.sterilized ?? "..."}
             <span className="pl-2">тварин</span>
            </p>
          </div>
          <div className="flex flex-row justify-between py-0 px-1 shadow-statistic w-[310px] h-[30px] bg-crm-backgraund">
            <h3 className="--font-inter font-normal text-xl text-crm-black">
              Прилаштовано
            </h3>
            <p className="--font-inter font-normal text-xl text-mainBlue">
              {data?.adopted ?? "..."} 
             <span className="pl-2">тварин</span>
            </p>
          </div>
          <div className="flex flex-row justify-between py-0 px-1 shadow-statistic w-[310px] h-[30px] bg-crm-backgraund">
            <h3 className="--font-inter font-normal text-xl text-crm-black">
              Померло
            </h3>
            <p className="--font-inter font-normal text-xl text-mainBlue">
              {data?.dead ?? "..."}
              <span className="pl-2">тварин</span>
            </p>
          </div>
        </div>
)}
    </div>
  );
}
