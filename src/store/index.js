import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todos";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
