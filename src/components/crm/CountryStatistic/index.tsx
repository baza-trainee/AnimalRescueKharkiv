"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { fetchCountryStats } from "@/src/utils/api/statistic";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);



const CountryStatistic = () => {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchCountryStats(); 
        setChartData(result);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);


  if (!chartData) return <p>...</p>;

  return (
    <div className="w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]" >
   <div><h3 className="font-normal text-[20px] text-black ">Кількість тварин прилаштованих по країнах:</h3></div> 
      <div className="flex-1 min-h-[200px] my-2 ">
      
        <Pie data={chartData} options={{
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
          font: {
            size: 12, 
          },
          padding: 6, 
         
        },
        },
      datalabels: {
        color: "black", 
        font: {
          size: 10,
          weight: "normal",
        },
        formatter: (value: number) => `${value}`, 
      },
      tooltip: {
        enabled: true, 
      },
    },
                 
                 
    
  }} />
      </div>
    </div>
  );
};

export default CountryStatistic;
