import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "../redux/Features/userSlices/userSlice";
import cvSlice from "./Features/CVSlices/cvSlice";
import templateSlice from "./Features/CVSlices/templateSlice";
import localStorageMiddleware from "../middleware/localStorageMiddleware";

const preloadedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cv: cvSlice,
    template: templateSlice,
  },
  preloadedState,
  middleware: [...getDefaultMiddleware(), localStorageMiddleware],
});
