import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from './expensesSlice'
import authReducer from './authSlice'
const store=configureStore({
    reducer:{
        expenses:expensesReducer,
        auth:authReducer
    }
})

export default store;