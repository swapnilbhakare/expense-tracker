import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    showEditModal: false,
    showDeleteModal: false,
    expenseToEdit: null,
    expenseToDelete: null,
    totalAmount: 0,
    currency: "",
    amount: "",
    description: "",
    category: "",
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

export const {
  setExpenses,
  setShowEditModal,
  setShowDeleteModal,
  setExpenseToEdit,
  setExpenseToDelete,
  setTotalAmount,
} = expensesSlice.actions;
export default expensesSlice.reducer;
