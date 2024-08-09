import { Bell, Calendar, Repeat } from "lucide-react";
import { TodoInputProps } from "../types/types";

const TodoInput = ({ newTodo, setNewTodo, handleAddTodo }: TodoInputProps) => {
  return (
    <div
      style={{
        background: "linear-gradient(0deg, #3579371A 0%, #D0FFD21A 100%)",
      }}
      className="flex h-[178px] flex-col gap-6 rounded-md border-t-[1.5px] border-[#496E4B33] p-6 dark:border-white"
    >
      <div className="h-full">
        <input
          type="text"
          placeholder="Add A Task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="h-full w-full bg-transparent font-normal outline-none placeholder:text-[#1B281BB8] dark:text-white dark:placeholder:text-white"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button>
            <Bell size={25} className="text-[#1B281B] dark:text-[#EBEBEB]" />
          </button>
          <button>
            <Repeat size={25} className="text-[#1B281B] dark:text-[#EBEBEB]" />
          </button>
          <button>
            <Calendar
              size={25}
              className="text-[#1B281B] dark:text-[#EBEBEB]"
            />
          </button>
        </div>
        <div>
          <button
            onClick={handleAddTodo}
            className="rounded-lg bg-[#35793729] px-4 py-2 text-[15px] font-medium text-[#357937] dark:bg-[#357937E0] dark:text-[#CFCFCF]"
          >
            ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
