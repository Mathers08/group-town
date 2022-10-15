import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICouple, ScheduleState } from "./types";

const initialState: ScheduleState = {
  couples: [],
};

export const slice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    editCouple: (state, action: PayloadAction<ICouple>) => {
      state.couples = state.couples.map(c => c.id === action.payload.id ? action.payload : c);
    },
  }
});

export const {
  editCouple
} = slice.actions;
export default slice.reducer;