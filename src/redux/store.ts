import { configureStore } from "@reduxjs/toolkit";
import todos from './todos/slice';

export const setupStore = () => configureStore({
  reducer: {
    todos
  },
});

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
