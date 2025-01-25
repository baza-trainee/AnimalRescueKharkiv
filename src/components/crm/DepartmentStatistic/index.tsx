import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Header from "../../crm/Header";
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

const DepartmentStatistic = () => {
  const data: ChartData = {
    labels: [
      "Клініка",
      "Іподром",
      "Есеніна",
      "Перетримка Зоя",
      "Перетримка Марина",
      "Бабаї",
      "Жихор",
      "Первомайськ",
    ],
    datasets: [
      {
        label: "Кількість тварин",
        data: [43, 47, 48, 48, 56, 62, 79, 82],
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
        borderRadius: 6,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className=" w-[342px] px-4 py-2 m-6 border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
        <h3 className="font-semibold text-2xl text-black ">
          Кількість тварин по відділах:
        </h3>
        <div className="w-[310px] flex-1 my-2">
          <Pie
            data={data}
            options={{
              layout: {
                padding: {
                  top: 0, // Padding above the chart
                  bottom: 8, // Padding below the chart
                  left: 0, // Padding to the left
                  right: 16, // Padding to the right
                },
              },
              plugins: {
                legend: {
                  position: "right" as const,
                  align: "center",
                  labels: {
                    boxWidth: 20,
                    font: {
                      size: 12,
                    },
                    padding: 4,
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
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DepartmentStatistic;
