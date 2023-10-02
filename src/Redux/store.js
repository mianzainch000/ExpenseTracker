import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../Redux/expenseSlice";
const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export default store;
