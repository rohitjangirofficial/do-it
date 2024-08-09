import React from "react";

export interface ProfileLink {
  label: string;
  icon: React.ElementType;
}

export interface NavbarProps {
  dark: boolean;
  darkModeHandler: () => void;
  todoView: string;
  handleToggleView: (view: string) => void;
  handleToggleSidebar: () => void;
}

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  isFavourite: boolean;
}

export interface SidebarProps {
  profileLinks: ProfileLink[];
  todos: Todo[];
  type?: string;
}

export interface TodoInputProps {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: () => void;
}

export interface TodoListProps {
  todos: Todo[];
  handleToggleComplete: (id: number) => void;
  handleToggleFavourite: (id: number) => void;
  handleOpenModal: (todo: Todo) => void;
  dark: boolean;
  isCompleted: boolean;
  todoView: string;
}

export interface TodoModalProps {
  selectedTodo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  handleToggleComplete: (id: number) => void;
  handleToggleFavourite: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}
