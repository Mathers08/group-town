import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, ISort } from "./types";
import { NewsImportanceEnum } from "../news/types";

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'все',
    sortProperty: NewsImportanceEnum.ALL
  }
};

export const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<ISort>) => {
      state.sortType = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.categoryId = 1;
        state.sortType = {
          name: 'все',
          sortProperty: NewsImportanceEnum.ALL
        };
      }
    }
  }
});

export const { setSearchValue, setCategoryId, setSort, setFilters } = slice.actions;
export default slice.reducer;