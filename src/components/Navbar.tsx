import { LayoutGrid, List, Menu, MoonStar, Search, Sun } from "lucide-react";
import { NavbarProps } from "../types/types";

const Navbar = ({
  dark,
  darkModeHandler,
  todoView,
  handleToggleView,
  handleToggleSidebar,
}: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between border-0 border-green-400 px-8 py-4">
      <div className="flex items-center gap-6">
        <button className="lg:hidden" onClick={handleToggleSidebar}>
          <Menu size={25} className="text-[#1B281B] dark:text-white" />
        </button>
        <img src="/logo.png" alt="logo" />
      </div>
      <div>
        <ul className="flex items-center gap-6">
          <li>
            <button>
              <Search size={25} className="text-[#1B281B] dark:text-white" />
            </button>
          </li>
          <li>
            {todoView === "card" ? (
              <button onClick={() => handleToggleView("list")}>
                <List size={25} className="text-[#1B281B] dark:text-white" />
              </button>
            ) : (
              <button onClick={() => handleToggleView("card")}>
                <LayoutGrid
                  size={25}
                  className="text-[#1B281B] dark:text-white"
                />
              </button>
            )}
          </li>
          <li>
            <button onClick={() => darkModeHandler()}>
              {dark ? (
                <Sun size={25} className="text-[#1B281B] dark:text-white" />
              ) : (
                <MoonStar size={25} color="#1B281B" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
