import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { AuthState, StatusEnum } from "./types";

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: any) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: any) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  const { data } = await axios.get('/auth/getAll');
  return data;
});

const initialState: AuthState = {
  users: [],
  data: null,
  status: StatusEnum.LOADING
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.data = null;
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = null;
      state.status = StatusEnum.ERROR;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = StatusEnum.ERROR;
    });

    builder.addCase(fetchMe.pending, (state) => {
      state.data = null;
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchMe.rejected, (state) => {
      state.data = null;
      state.status = StatusEnum.ERROR;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.users = [];
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.users = [];
      state.status = StatusEnum.ERROR;
    });
  }
});

export const {
  logout
} = slice.actions;
export default slice.reducer;