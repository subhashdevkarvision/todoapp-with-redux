import { configureStore } from "@reduxjs/toolkit";
import todoReucer from "../features/todoSlices";

const store = configureStore({
  reducer: todoReucer,
});

export default store;
