import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./slices/characterSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
