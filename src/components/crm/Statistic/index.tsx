"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uk } from "date-fns/locale";
import { isSameMonth, isSameYear } from "date-fns";

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo); // Дата на месяц назад
  const [endDate, setEndDate] = useState<Date | null>(today);
  const highlightDates = [startDate, endDate]
    .filter((date): date is Date => date !== null)
    .filter((date) => isSameMonth(date, today) && isSameYear(date, today));

  return (
// <<<<<<< admin-panel
//     <div className=" container">
//       <div className="flex flex-row justify-between w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
//         <div className="--font-inter font-medium text-2xl leading-9 text-crm-black">
//           Всього тварин в АRK{" "}
//         </div>
//         <div className="--font-inter font-medium text-2xl leading-9 text-center text-mainBlue">
//           342
//         </div>
//       </div>

//       <h2 className="--font-inter font-medium text-2xl leading-9 text-crm-black text-center mb-4 max-w-[342px] pl-12">
//         Статистика по ARK
//       </h2>
//       <div className="flex justify-between w-[342px] mb-6 ml-6 mr-6 mt-4">
//         <div className=" relative">
//           <p>З</p>
// =======
      <div className=" container">
          <div className="flex flex-row justify-between w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
              <div className="--font-inter font-medium text-2xl leading-9 text-crm-black">Всього тварин в АRK </div>
              <div className="--font-inter font-medium text-2xl leading-9 text-center text-mainBlue">342</div>          
          </div>
        
      <h2 className="--font-inter w-[342px] ml-6 mr-6 font-medium text-2xl leading-9 text-crm-black text-center mb-4">Статистика по ARK</h2>
          <div className="flex justify-between w-[342px] mb-6 ml-6 mr-6 mt-4">
              <div className=" relative">
                  <p>З</p>
          <DatePicker
            toggleCalendarOnIconClick
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={uk}
            className="border px-2 py-3 w-[163px] h-[45px] rounded-[10px] border-crm-secondary-blue  flex flex-row-reverse text-black focus:border-mainBlue outline-none"
            placeholderText=""
            dateFormat="dd.MM.yyyy"
            closeOnScroll={(e) => e.target === document}
            calendarClassName={`custom-calendar  ${
              startDate && startDate.toDateString() !== today.toDateString()
                ? "hide-today"
                : ""
            }`}
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={10}
            scrollableYearDropdown
            withPortal
            portalId="root-portal"
            highlightDates={highlightDates}
          />
          <div className=" absolute right-3 top-2/3 transform -translate-y-1/2 pointer-events-none">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.2534 7.97828C13.4907 7.73882 13.489 7.35229 13.2495 7.11496C13.01 6.87762 12.6235 6.87935 12.3862 7.11881L10.964 8.55379C10.3867 9.13616 9.98951 9.53565 9.65291 9.80597C9.32595 10.0685 9.11594 10.1586 8.92785 10.1826C8.80975 10.1977 8.69025 10.1977 8.57215 10.1826C8.38406 10.1586 8.17405 10.0685 7.84709 9.80597C7.51049 9.53566 7.11325 9.13616 6.53605 8.55379L5.11382 7.11881C4.87648 6.87935 4.48996 6.87762 4.2505 7.11496C4.01104 7.35229 4.00931 7.73882 4.24665 7.97828L5.6945 9.43911C6.23979 9.98931 6.68548 10.439 7.08258 10.7579C7.49552 11.0895 7.91466 11.3296 8.41778 11.3937C8.63838 11.4219 8.86162 11.4219 9.08223 11.3937C9.58534 11.3296 10.0045 11.0895 10.4174 10.7579C10.8145 10.439 11.2602 9.98933 11.8055 9.43913L13.2534 7.97828Z"
                fill="#B6BBEB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 0.426453C3.91751 0.426453 0 4.34396 0 9.17645C0 14.0089 3.91751 17.9265 8.75 17.9265C13.5825 17.9265 17.5 14.0089 17.5 9.17645C17.5 4.34396 13.5825 0.426453 8.75 0.426453ZM1.22093 9.17645C1.22093 5.01826 4.59181 1.64738 8.75 1.64738C12.9082 1.64738 16.2791 5.01826 16.2791 9.17645C16.2791 13.3346 12.9082 16.7055 8.75 16.7055C4.59181 16.7055 1.22093 13.3346 1.22093 9.17645Z"
                fill="#B6BBEB"
              />
            </svg>
          </div>
        </div>
        <div className=" relative">
          <p>По</p>
          <DatePicker
            toggleCalendarOnIconClick
            className="border px-2 py-3 w-[163px] h-[45px] rounded-[10px] border-crm-secondary-blue   text-black focus:border-mainBlue outline-none"
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            dateFormat="dd.MM.yyyy"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            locale={uk}
            minDate={startDate ?? undefined}
            placeholderText=""
            closeOnScroll={(e) => e.target === document}
            calendarClassName={`custom-calendar ${
              startDate && startDate.toDateString() !== today.toDateString()
                ? "hide-today"
                : ""
            }`}
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={10}
            scrollableYearDropdown
            withPortal
            portalId="root-portal"
          />
          <div className=" absolute right-3 top-2/3 transform -translate-y-1/2 pointe bg-crm-backgraundr-events-none">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.2534 7.97828C13.4907 7.73882 13.489 7.35229 13.2495 7.11496C13.01 6.87762 12.6235 6.87935 12.3862 7.11881L10.964 8.55379C10.3867 9.13616 9.98951 9.53565 9.65291 9.80597C9.32595 10.0685 9.11594 10.1586 8.92785 10.1826C8.80975 10.1977 8.69025 10.1977 8.57215 10.1826C8.38406 10.1586 8.17405 10.0685 7.84709 9.80597C7.51049 9.53566 7.11325 9.13616 6.53605 8.55379L5.11382 7.11881C4.87648 6.87935 4.48996 6.87762 4.2505 7.11496C4.01104 7.35229 4.00931 7.73882 4.24665 7.97828L5.6945 9.43911C6.23979 9.98931 6.68548 10.439 7.08258 10.7579C7.49552 11.0895 7.91466 11.3296 8.41778 11.3937C8.63838 11.4219 8.86162 11.4219 9.08223 11.3937C9.58534 11.3296 10.0045 11.0895 10.4174 10.7579C10.8145 10.439 11.2602 9.98933 11.8055 9.43913L13.2534 7.97828Z"
                fill="#B6BBEB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 0.426453C3.91751 0.426453 0 4.34396 0 9.17645C0 14.0089 3.91751 17.9265 8.75 17.9265C13.5825 17.9265 17.5 14.0089 17.5 9.17645C17.5 4.34396 13.5825 0.426453 8.75 0.426453ZM1.22093 9.17645C1.22093 5.01826 4.59181 1.64738 8.75 1.64738C12.9082 1.64738 16.2791 5.01826 16.2791 9.17645C16.2791 13.3346 12.9082 16.7055 8.75 16.7055C4.59181 16.7055 1.22093 13.3346 1.22093 9.17645Z"
                fill="#B6BBEB"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
        <div className="flex flex-row justify-between py-0 px-1 shadow-statistic w-[310px] h-[30px] bg-crm-backgraund">
          <h3 className="--font-inter font-normal text-xl text-crm-black">
            Стерилізовано
          </h3>
          <p className="--font-inter font-normal text-xl text-mainBlue">
            {" "}
            тварин
          </p>
        </div>
        <div className="flex flex-row justify-between py-0 px-1 shadow-statistic w-[310px] h-[30px] bg-crm-backgraund">
          <h3 className="--font-inter font-normal text-xl text-crm-black">
            Прилаштовано
          </h3>
          <p className="--font-inter font-normal text-xl text-mainBlue">
            {" "}
            тварин
          </p>
        </div>
        <div className="flex flex-row justify-between py-0 px-1 shadow-statistic w-[310px] h-[30px] bg-crm-backgraund">
          <h3 className="--font-inter font-normal text-xl text-crm-black">
            Померло
          </h3>
          <p className="--font-inter font-normal text-xl text-mainBlue">
            {" "}
            тварин
          </p>
        </div>
      </div>
    </div>
  );
}
