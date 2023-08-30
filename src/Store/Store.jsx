import { configureStore } from "@reduxjs/toolkit";
import  authReducer from './authSlice'
import ThemeReducer from './themsSlice'
import ExpenseReducer from "./expensesSlice";
const store = configureStore({
    reducer:{
        authentication:authReducer,
        expense: ExpenseReducer,
        theme: ThemeReducer,
    }
})
export default store