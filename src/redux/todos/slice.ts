import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo, TodosState } from "./types";
import axios from "../../axios";
import { StatusEnum } from "../auth/types";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const { data } = await axios.get('/todos');
  return data;
});

export const fetchRemove = createAsyncThunk('todos/fetchRemove', async (id: string) => {
  const { data } = await axios.delete(`/todos/${id}`);
  return data;
});

const initialState: TodosState = {
  todos: [],
  status: StatusEnum.LOADING
};

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    clearAll: (state) => {
      state.todos = [];
    },
    doneTodo: (state, action: PayloadAction<string>) => {
      const copyTodos = [...state.todos];
      const index = copyTodos.findIndex(todo => todo._id === action.payload);
      copyTodos[index].isCompleted = !copyTodos[index].isCompleted;
      state.todos = copyTodos;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.todos = [];
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.todos = [];
      state.status = StatusEnum.ERROR;
    });

    builder.addCase(fetchRemove.pending, (state, action) => {
      state.todos = state.todos.filter(obj => obj._id !== action.meta.arg);
    });
  }
});

export const {
  addTodo,
  clearAll,
  doneTodo,
} = slice.actions;
export default slice.reducer;