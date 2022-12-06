import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiscipline, PerformanceState } from "./types";

const initialState: PerformanceState = {
  disciplines: [],
};

export const slice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    addDiscipline: (state, action: PayloadAction<IDiscipline>) => {
      state.disciplines.unshift(action.payload);
    },
  },
});

export const {
  addDiscipline
} = slice.actions;
export default slice.reducer;