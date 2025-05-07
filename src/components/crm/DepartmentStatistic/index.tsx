"use client";

import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../../utils/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Header from "../../crm/Header";

const API_CRM_PATH = process.env.NEXT_PUBLIC_API_CRM_PATH;
const API_STATS_PATH = process.env.NEXT_PUBLIC_API_STATS_PATH;

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ApiResponse {
  labels: string[];
  data: number[];
}

const backgroundColors = [
  "rgba(232, 193, 160, 1)",
  "rgba(232, 168, 56, 1)",
  "rgba(241, 225, 91, 1)",
  "rgba(97, 205, 187, 1)",
  "rgba(244, 117, 96, 1)",
  "rgba(232, 168, 56, 1)",
  "rgba(151, 227, 213, 1)",
  "rgba(244, 117, 96, 1)",
   "rgba(232, 193, 160, 1)",
  "rgba(232, 168, 56, 1)",
  "rgba(241, 225, 91, 1)",
  "rgba(97, 205, 187, 1)",
  "rgba(244, 117, 96, 1)",
  "rgba(232, 168, 56, 1)",
  "rgba(151, 227, 213, 1)",
  "rgba(244, 117, 96, 1)",
];



const DepartmentStatistic = () => {
  const { data: apiData, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["departmentChartData"],
    queryFn: () => fetch(`${API_CRM_PATH}${API_STATS_PATH}/departments`), 
  });

  if (isLoading) return <p>Завантаження даних...</p>;
  if (isError || !apiData || apiData.data.length === 0) {
    return <p>Помилка завантаження даних</p>;
  }
 const combined = apiData.labels.map((label, i) => ({
    label,
    value: apiData.data[i],
  }));
  combined.sort((a, b) => a.value - b.value); 

  const sortedLabels = combined.map((item) => item.label);
  const sortedData = combined.map((item) => item.value);

  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Кількість тварин",
        data: sortedData,
        backgroundColor: backgroundColors.slice(0, apiData?.data?.length || 0), 
        borderRadius: 3,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
      <h3 className="font-semibold text-2xl text-[#070600]">
        Кількість тварин по відділах:
      </h3>
      <div className="flex gap-2 max-h-[240px] items-center overflow-hidden">
         <div className="flex-1 min-w-[181px] min-h-[176px]">
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,           
            plugins: {
              legend: {
                  display: false,
                position: "right",
                align: "center",
                maxWidth: 120,
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                  boxWidth: 20,
                  font: { weight: 400, size: 10 },
                  padding: 6,
                },
                fullSize: false,
              },
              datalabels: {
                color: "black",
                font: { size: 10, weight: "normal" },
                formatter: (value: number) => `${value}`,
              },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>
        <div className="max-h-[234px] overflow-y-auto w-[120px] pr-1 custom-scroll">
          <ul className="my-auto">
      {chartData.labels.map((label, index) => (
        <li key={index} className="flex items-center gap-2 text-[10px] text-crm-black font-normal leading-[15px]">
          <span
            className="w-3 h-3 inline-block rounded-full"
            style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
          ></span>
          {label}
        </li>
      ))}
    </ul>
  </div>
      </div>
     
      
    </div>
    
  );
};

export default DepartmentStatistic;
