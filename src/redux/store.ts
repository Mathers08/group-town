import { configureStore } from "@reduxjs/toolkit";
import todos from './todos/slice';
import news from './news/slice';

export const setupStore = () => configureStore({
  reducer: {
    todos,
    news
  },
});

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
