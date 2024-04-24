import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../Redux/expenseSlice";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["expenses", "totalIncome", "totalExpense"],
};

const persistedReducer = persistReducer(persistConfig, expenseReducer);

const store = configureStore({
  reducer: {
    expenses: persistedReducer,
  },
});

const persistor = persistStore(store);

export { persistor };
export default store;
