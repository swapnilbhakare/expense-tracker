import { configureStore } from "@reduxjs/toolkit";
import  authReducer from './authSlice'

import expensesReducer from "./expensesSlice";
const store = configureStore({
    reducer:{
        authentication:authReducer,
        expense:expensesReducer
    }
})
export default store