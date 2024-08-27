import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from './expensesSlice'
import authReducer from './authSlice'
import themeReducer from './themeSlice'
const store=configureStore({
    reducer:{
        expenses:expensesReducer,
        auth:authReducer,
        theme:themeReducer
    }
})

export default store;