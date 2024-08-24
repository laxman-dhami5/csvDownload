import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [] // Ensure items is initialized as an empty array
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        addExpense(state, action) {
            state.items.push(action.payload);
        },
        removeExpense(state, action) {
            state.items = state.items.filter(expense => expense.id !== action.payload);
        }
         
    }
});
export const selectTotalExpenses = (state) => {
    return state.expenses.items.reduce((total, expense) => total + Number(expense.money), 0);
  };

export const { setItems, addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
