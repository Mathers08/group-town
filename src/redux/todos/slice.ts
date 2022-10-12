import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo, TodosState } from "./types";

const initialState: TodosState = {
  todos: [],
};

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    clearAll: (state) => {
      state.todos = [];
    },
    doneTodo: (state, action: PayloadAction<string>) => {
      const copyTodos = [...state.todos];
      const index = copyTodos.findIndex(todo => todo.id === action.payload);
      copyTodos[index].isComplete = !copyTodos[index].isComplete;
      state.todos = copyTodos;
    },
    editTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo);
    },
  }
});

export const {
  addTodo,
  deleteTodo,
  clearAll,
  doneTodo,
  editTodo,
} = slice.actions;
export default slice.reducer;