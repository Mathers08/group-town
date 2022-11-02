import { configureStore } from "@reduxjs/toolkit";
import todos from './todos/slice';
import news from './news/slice';
import schedule from './schedule/slice';
import auth from './auth/slice';

export const setupStore = () => configureStore({
  reducer: {
    todos,
    news,
    schedule,
    auth
  },
});

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
