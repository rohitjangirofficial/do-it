import { Bell, Calendar, Plus, Repeat, Star, Trash2, X } from "lucide-react";
import { TodoModalProps } from "../types/types";
import { useEffect } from "react";

const TodoModal = ({
  selectedTodo,
  setSelectedTodo,
  handleToggleComplete,
  handleToggleFavourite,
  handleDeleteTodo,
  setIsModalOpen,
  dark,
}: TodoModalProps) => {
  useEffect(() => {
    if (isScreenSizeBelowLg()) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const isScreenSizeBelowLg = () => window.innerWidth < 1024;

  return (
    <div
      className="fixed right-0 top-0 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.500)] p-6 lg:static lg:block lg:w-[450px] lg:bg-transparent lg:p-0"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-14 flex w-[450px] flex-col justify-between rounded-md bg-[#EEF6EF] p-5 dark:bg-[#2C2C2C] lg:mb-0 lg:w-auto">
        <ul>
          <li className="flex h-[80px] items-center justify-between border-b-2 border-[#496E4B33] px-6 last:border-0">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="h-[18px] w-[18px] accent-[#3F9142]"
                checked={selectedTodo.isCompleted}
                onChange={() => {
                  handleToggleComplete(selectedTodo.id);
                  setSelectedTodo({
                    ...selectedTodo,
                    isCompleted: !selectedTodo.isCompleted,
                  });
                }}
              />
              <p className="text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB]">
                {selectedTodo.title}
              </p>
            </div>
            <button
              onClick={() => {
                handleToggleFavourite(selectedTodo.id);
                setSelectedTodo({
                  ...selectedTodo,
                  isFavourite: !selectedTodo.isFavourite,
                });
              }}
            >
              <Star
                size={25}
                fill={
                  selectedTodo?.isFavourite
                    ? dark
                      ? "white"
                      : "black"
                    : "none"
                }
                className="text-black dark:text-white"
              />
            </button>
          </li>
          <li className="flex h-[60px] items-center gap-4 border-b-2 border-[#496E4B33] px-6 last:border-0">
            <Plus size={25} className="text-[#1B281B] dark:text-[#EBEBEB]" />
            <p className="text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB]">
              Add Step
            </p>
          </li>
          <li className="flex h-[60px] items-center gap-4 border-b-2 border-[#496E4B33] px-6 last:border-0">
            <Bell size={25} className="text-[#1B281B] dark:text-[#EBEBEB]" />
            <p className="text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB]">
              Set Reminder
            </p>
          </li>
          <li className="flex h-[60px] items-center gap-4 border-b-2 border-[#496E4B33] px-6 last:border-0">
            <Calendar
              size={25}
              className="text-[#1B281B] dark:text-[#EBEBEB]"
            />
            <p className="text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB]">
              Add Due Date
            </p>
          </li>
          <li className="flex h-[60px] items-center gap-4 border-b-2 border-[#496E4B33] px-6 last:border-0">
            <Repeat size={25} className="text-[#1B281B] dark:text-[#EBEBEB]" />
            <p className="text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB]">
              Repeat
            </p>
          </li>
          <li className="last:border- flex h-[125px] items-start gap-4 border-b-2 border-[#496E4B33] px-6 py-4 last:border-0">
            <textarea
              className="h-full w-full bg-transparent text-[15px] font-normal text-[#1B281B96] outline-none placeholder:text-[#1B281B96] dark:text-[#EBEBEB] dark:placeholder:text-[#EBEBEB]"
              placeholder="Add Notes"
            />
          </li>
        </ul>
        <div className="flex items-center justify-between border-t-2 border-[#35793799] pt-5">
          <button onClick={() => setIsModalOpen(false)}>
            <X size={25} className="text-black dark:text-white" />
          </button>
          <button
            onClick={() => {
              handleDeleteTodo(selectedTodo.id);
              setSelectedTodo(null);
              setIsModalOpen(false);
            }}
          >
            <Trash2 size={25} className="text-black dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
