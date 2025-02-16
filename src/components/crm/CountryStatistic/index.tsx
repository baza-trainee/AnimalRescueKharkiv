"use client";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../../utils/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
];

const CountryStatistic = () => {
  const { data: apiData, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["countryChartData"],
    queryFn: () => fetch(`${API_CRM_PATH}${API_STATS_PATH}/countries`),
  });

  if (isLoading) return <p>Завантаження даних...</p>;
  if (isError) return <p>Помилка завантаження даних</p>;

  const chartData = {
    labels: apiData?.labels || [],
    datasets: [
      {
        label: "Кількість тварин",
        data: apiData?.data || [],
        backgroundColor: backgroundColors.slice(0, apiData?.data?.length || 0),
        borderRadius: 4,
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]" >
   <div><h3 className="font-normal text-[20px] text-black ">Кількість тварин прилаштованих по країнах:</h3></div> 
      <div className="flex-1 min-h-[200px] my-2 ">
      
        <Pie 
          data={chartData} 
          options={{
            maintainAspectRatio: false,
            radius: 90 ,
            plugins: {
              legend: {
                position: "right" as const, 
                maxWidth: 100,
            
                align: "center",
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle', 
                  boxWidth: 20, 
                  font: { size: 12, },
                  padding: 6,
                },
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
    </div>
  );
};

export default CountryStatistic;