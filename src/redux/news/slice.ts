import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews, NewsStatusEnum, NewsState } from "./types";
import axios from "../../axios";

export const fetchNews = createAsyncThunk('/news/fetchNews', async () => {
  const { data } = await axios.get('/news');
  return data;
});

const initialState: NewsState = {
  news: [],
  status: NewsStatusEnum.LOADING
};

export const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<INews>) => {
      state.news.unshift(action.payload);
    },
    deleteNews: (state, action: PayloadAction<string>) => {
      state.news = state.news.filter(n => n._id !== action.payload);
    },
    editNews: (state, action: PayloadAction<INews>) => {
      state.news = state.news.map(n => n._id === action.payload._id ? action.payload : n);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNews.pending, (state) => {
      state.news = [];
      state.status = NewsStatusEnum.LOADING;
    })
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.status = NewsStatusEnum.SUCCESS;
    })
    builder.addCase(fetchNews.rejected, (state) => {
      state.news = [];
      state.status = NewsStatusEnum.ERROR;
    })
  }
});

export const {
  addNews,
  deleteNews,
  editNews
} = slice.actions;
export default slice.reducer;