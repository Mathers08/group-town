import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews, NewsState } from "./types";
import { StatusEnum } from "../auth/types";
import axios from "../../axios";

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const { data } = await axios.get('/news');
  return data;
});

export const fetchRemove = createAsyncThunk('news/fetchRemove', async (id: string) => {
  const { data } = await axios.delete(`/news/${id}`);
  return data;
});

const initialState: NewsState = {
  news: [],
  status: StatusEnum.LOADING
};

export const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<INews>) => {
      state.news.unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNews.pending, (state) => {
      state.news = [];
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.news = [];
      state.status = StatusEnum.ERROR;
    });

    builder.addCase(fetchRemove.pending, (state, action) => {
      state.news = state.news.filter(obj => obj._id !== action.meta.arg);
    });
  }
});

export const {
  addNews,
} = slice.actions;
export default slice.reducer;