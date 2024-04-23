import { createSlice, current } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    currentBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  },

  reducers: {
    addExpense: (state, action) => {
      // state.expenses = [...state.expenses, action.payload];
      state.expenses.push(action.payload);
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (item, index) => index !== action.payload
      );
    },

    updateExpense: (state, action) => {
      const { index, date, description, amount, selectBox } = action.payload;
      state.expenses[index] = { date, description, amount, selectBox };
    },

    totalIncome: (state, action) => {
      state.totalIncome += action.payload;
    },

    totalExpense: (state, action) => {
      state.totalExpense += action.payload;
    },

    calculateTotal: (state, action) => {
      let totalIncomeAmount = 0;
      let totalExpensesAmount = 0;
      const currentState = current(state);
      console.log(currentState);
      for (let i = 0; i < currentState.expenses.length; i++) {
        const amount = currentState.expenses[i];
        console.log(amount);
        if (amount.selectBox === 1) {
          totalIncomeAmount += amount.amount;
        } else if (amount.selectBox === 2) {
          totalExpensesAmount += amount.amount;
        }
      }
      state.totalIncome = totalIncomeAmount;
      state.totalExpense = totalExpensesAmount;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  totalIncome,
  totalExpense,
  calculateTotal,
} = expenseSlice.actions;
export default expenseSlice.reducer;
