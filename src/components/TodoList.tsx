import { Star } from "lucide-react";
import { TodoListProps } from "../types/types";

const TodoList = ({
  todos,
  handleToggleComplete,
  handleToggleFavourite,
  handleOpenModal,
  dark,
  isCompleted,
  todoView,
}: TodoListProps) => {
  return (
    <ul
      className={`${todoView === "card" && "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"}`}
    >
      {todos
        .filter((todo) => todo.isCompleted === isCompleted)
        .map((todo) => (
          <li
            key={todo.id}
            className={`flex ${isCompleted ? "h-[60px]" : todoView == "card" ? "h-[100px] border-2 border-[#496E4B33]" : "h-[80px] border-b-2 border-[#496E4B33] last:border-0"} items-center justify-between px-6`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="h-[18px] w-[18px] accent-[#3F9142]"
                checked={todo.isCompleted}
                onChange={() => handleToggleComplete(todo.id)}
              />
              <p
                className={`cursor-pointer text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB] ${
                  todo.isCompleted && "line-through"
                }`}
                onClick={() => handleOpenModal(todo)}
              >
                {todo.title}
              </p>
            </div>
            <button onClick={() => handleToggleFavourite(todo.id)}>
              <Star
                size={25}
                fill={todo?.isFavourite ? (dark ? "white" : "black") : "none"}
                className="text-black dark:text-white"
              />
            </button>
          </li>
        ))}
    </ul>
  );
};

export default TodoList;
