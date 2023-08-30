import { configureStore } from "@reduxjs/toolkit";
import  authReducer from './authSlice'

import ExpenseReducer from "./expensesSlice";
const store = configureStore({
    reducer:{
        authentication:authReducer,
        expense: ExpenseReducer,
    }
})
export default store