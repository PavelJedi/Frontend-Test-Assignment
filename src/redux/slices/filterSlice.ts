import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FiltersState {
  movie: string;
  name: string;
  gender: string;
  massRange: { min: number | null; max: number | null };
}

const initialState: FiltersState = {
  movie: "",
  name: "",
  gender: "",
  massRange: { min: null, max: null },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FiltersState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
