"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderRadius?: number;
    borderWidth: number;
  }[];
}

const CountryStatistic = () => {
  const data: ChartData = {
    labels: [
      "Україна",
      "Польща",
      "Румунія",
      "Чехія",
      "Молдова",
      "Німеччина",
      "Італія ",
     "Англія",

    ],
    datasets: [
      {
        label: "Кількість тварин",
            data: [1, 3, 7, 11, 39, 51, 64,
        ],
        backgroundColor: [
          "rgba(232, 193, 160, 1)",
          "rgba(232, 168, 56, 1)",
          "rgba(241, 225, 91, 1)",
          "rgba(97, 205, 187, 1)",
          "rgba(244, 117, 96, 1)",
          "rgba(232, 168, 56, 1)",
          "rgba(151, 227, 213, 1)",
          "rgba(244, 117, 96, 1)",
        ],
        borderRadius: 4,
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]" >
   <div><h3 className="font-normal text-[20px] text-black ">Кількість тварин прилаштованих по країнах:</h3></div> 
      <div className="flex-1 min-h-[200px] my-2 ">
      
        <Pie data={data} options={{
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
