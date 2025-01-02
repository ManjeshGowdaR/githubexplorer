import { configureStore } from "@reduxjs/toolkit";
import githubDataReducer from "../slice/githubData";

export const store = configureStore({
  reducer: githubDataReducer,
});
