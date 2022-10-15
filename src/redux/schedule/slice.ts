import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduleState } from "./types";

const initialState: ScheduleState = {
  couple: [],
};

export const slice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {

  }
});

export const {

} = slice.actions;
export default slice.reducer;