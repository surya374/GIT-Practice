import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import { useDispatch } from "react-redux";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
