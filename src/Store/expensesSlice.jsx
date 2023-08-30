import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    showEditModal: false,
    showDeleteModal: false,
    expenseToEdit: null,
    expenseToDelete: null,
    totalAmount: 0,
  },
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setShowEditModal(state, action) {
      state.showEditModal = action.payload;
    },
    setShowDeleteModal(state, action) {
      state.showDeleteModal = action.payload;
    },
    setExpenseToEdit(state, action) {
      state.expenseToEdit = action.payload;
    },
    setExpenseToDelete(state, action) {
      state.expenseToDelete = action.payload;
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;