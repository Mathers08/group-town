import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews, NewsState } from "./types";

const initialState: NewsState = {
  news: [],
};

export const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<INews>) => {
      state.news.unshift(action.payload);
    },
    deleteNews: (state, action: PayloadAction<string>) => {
      state.news = state.news.filter(n => n.id !== action.payload);
    },
    editNews: (state, action: PayloadAction<INews>) => {
      state.news = state.news.map(n => n.id === action.payload.id ? action.payload : n);
    },
  }
});

export const {
  addNews,
  deleteNews,
  editNews
} = slice.actions;
export default slice.reducer;