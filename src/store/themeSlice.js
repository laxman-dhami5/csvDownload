import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isDark:false,
}
const themeSlice= createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme(state){
            state.isDark=!state.isDark
        },
        activateDarkTheme(state){
            state.isDark=true
        }
    }
 })
export const {toggleTheme,activateDarkTheme}=themeSlice.actions;
 export default themeSlice.reducer;