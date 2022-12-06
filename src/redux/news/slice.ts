import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment, INews, NewsState } from "./types";
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
    addComment: (state, action: PayloadAction<{ id: string, comment: IComment }>) => {
      const singleNews = state.news.find(n => n._id === action.payload.id);
      if (singleNews) {
        singleNews.comments.push(action.payload.comment);
      }
    },
    deleteComment: (state, action: PayloadAction<{ id: string, comment: IComment }>) => {
      const singleNews = state.news.find(n => n._id === action.payload.id);
      if (singleNews) {
        singleNews.comments = singleNews.comments.filter(c => c._id !== action.payload.id);
      }
    }
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
  addComment,
  deleteComment
} = slice.actions;
export default slice.reducer;