import { Plus } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SidebarProps } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = ({ profileLinks, todos }: SidebarProps) => {
  const data = {
    labels: ["Pending", "Done"],
    datasets: [
      {
        label: "Poll",
        data: [
          todos.filter((todo) => !todo.isCompleted).length,
          todos.filter((todo) => todo.isCompleted).length,
        ],
        backgroundColor: ["#3F9142", "#142E15"],
        borderColor: ["#3F9142", "#142E15"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "Outfit",
            size: 12,
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: "Outfit",
        },
        titleFont: {
          family: "Outfit",
        },
      },
    },
  };

  return (
    <div className={`w-full flex-col justify-end lg:h-auto lg:pt-[62.5px]`}>
      <div className="relative flex h-full w-full flex-col items-center bg-[#EEF6EF] pt-4 dark:bg-[#2C2C2C] lg:rounded-md lg:pt-0">
        <img
          src="https://images.unsplash.com/photo-1721804978443-62d13f1e8a00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
          alt="avatar"
          className="static top-[-62.5px] h-[125px] w-[125px] rounded-full object-cover lg:absolute"
        />
        <div className="flex w-full flex-col items-center gap-2 px-5 pb-4 lg:pt-[62.5px]">
          <h4 className="mt-2 text-[15px] font-medium text-[#1B281B] dark:text-[#EBEBEB]">
            Hey, ABCD
          </h4>
          <div className="flex w-full flex-col gap-4">
            <ul className="flex w-full flex-col gap-4 rounded-md bg-white px-2 py-4 dark:bg-[#232323]">
              {profileLinks.map((link) => (
                <li
                  className="flex gap-2 text-[15px] font-medium text-[#1B281B] dark:text-[#EBEBEB]"
                  key={link.label}
                >
                  <link.icon size={25} />
                  {link.label}
                </li>
              ))}
            </ul>
            <div className="rounded-md bg-white dark:bg-[#232323]">
              <button className="flex w-full items-center gap-2 p-6 text-[#1B281B] dark:text-[#EBEBEB]">
                <Plus size={30} />
                Add List
              </button>
            </div>

            <div className="flex flex-col gap-3 rounded-md bg-white p-6 dark:bg-[#232323]">
              {todos.length > 0 ? (
                <>
                  <div>
                    <p className="text-[15px] font-medium text-[#1B281B] dark:text-[#EBEBEB]">
                      Today Task
                    </p>
                    <span className="text-[20px] font-medium text-[#1B281B] dark:text-[#EBEBEB]">
                      {todos.length}
                    </span>
                  </div>
                  <hr className="mx-[-24px] h-[1.33px] border-t-0 bg-[#F0F0F0] dark:bg-black" />
                  <Doughnut id="doughnutChart" data={data} options={options} />
                </>
              ) : (
                <span className="text-[15px] font-medium text-[#1B281B] dark:text-[#EBEBEB]">
                  No Data...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
