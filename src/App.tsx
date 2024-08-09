import {
  Calendar,
  ChevronDown,
  ClipboardList,
  NotebookText,
  ScrollText,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoModal from "./components/TodoModal";
import { ProfileLink, Todo } from "./types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import {
  addTodo,
  toggleComplete,
  toggleFavourite,
  deleteTodo,
  setTodos,
} from "./redux/slices/todosSlice";

const profileLinks: ProfileLink[] = [
  {
    label: " All Tasks",
    icon: ClipboardList,
  },
  {
    label: " Today",
    icon: Calendar,
  },
  {
    label: " Important",
    icon: Star,
  },
  {
    label: "Planned",
    icon: NotebookText,
  },
  {
    label: "Assigned to me",
    icon: ScrollText,
  },
];

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);
  const [todoView, setTodoView] = useState<string>("card");

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(setTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("item set");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
        isCompleted: false,
        isFavourite: false,
      };
      dispatch(addTodo(newTodoItem));
      setNewTodo("");
    }
  };

  const handleToggleView = (view: string) => {
    setTodoView(view);
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleComplete(id));
  };

  const handleToggleFavourite = (id: number) => {
    dispatch(toggleFavourite(id));
  };

  useEffect(() => {
    if (toggleSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [toggleSidebar]);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      <Navbar
        darkModeHandler={darkModeHandler}
        dark={dark}
        todoView={todoView}
        handleToggleView={handleToggleView}
        handleToggleSidebar={handleToggleSidebar}
      />
      <div className="flex gap-8 p-8">
        {/* Tab And Desktop Sidebar*/}
        <div className="hidden w-[350px] lg:block">
          <Sidebar profileLinks={profileLinks} todos={todos} />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 right-0 top-0 z-40 h-full w-full transform bg-[rgba(0,0,0,0.500)] transition-all lg:hidden lg:transform-none ${toggleSidebar ? "translate-x-0" : "-translate-x-full"}`}
          onClick={handleToggleSidebar}
        >
          <div
            className="h-full w-[350px] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar profileLinks={profileLinks} todos={todos} type="mobile" />
          </div>
        </div>

        {/* Content */}
        <div className="h-screen w-full border-0 border-purple-400">
          <div className="py-2">
            <button className="flex items-center gap-1">
              <span className="text-[15px] font-medium text-[#142E159E] dark:text-[#97F69BB5]">
                To Do
              </span>
              <ChevronDown
                size={25}
                className="text-[#142E159E] dark:text-[#97F69BB5]"
              />
            </button>
          </div>
          <div className="flex h-full gap-8">
            <div className="w-full">
              <TodoInput
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                handleAddTodo={handleAddTodo}
              />
              <div className="mt-6 border-0 border-red-400">
                <TodoList
                  todos={todos}
                  handleToggleComplete={handleToggleComplete}
                  handleToggleFavourite={handleToggleFavourite}
                  handleOpenModal={handleOpenModal}
                  dark={dark}
                  isCompleted={false}
                  todoView={todoView}
                />

                <div className="border-0 border-red-400">
                  <div>
                    <h3 className="border-b-2 border-[#496E4B33] pb-6 text-[15px] font-normal text-[#1B281B] dark:text-[#EBEBEB]">
                      Completed
                    </h3>
                    <TodoList
                      todos={todos}
                      handleToggleComplete={handleToggleComplete}
                      handleToggleFavourite={handleToggleFavourite}
                      handleOpenModal={handleOpenModal}
                      dark={dark}
                      isCompleted={true}
                      todoView="list"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            {isModalOpen && selectedTodo && (
              <TodoModal
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                handleToggleComplete={handleToggleComplete}
                handleToggleFavourite={handleToggleFavourite}
                handleDeleteTodo={handleDeleteTodo}
                setIsModalOpen={setIsModalOpen}
                dark={dark}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
