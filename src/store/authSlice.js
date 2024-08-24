import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:false,
    idToken:null,
    userId:null
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            state.isLoggedIn=true
            state.idToken=action.payload.idToken
            state.userId=action.payload.userId
        },
        logout(state){
            state.isLoggedIn=false
            state.idToken=null
            state.userId=null
        },
        updateToken(state,action){
            state.idToken=action.payload.idToken;
        },
        varify(state){
           
        }
    }
})
export const {login,logout,updateToken,varify}=authSlice.actions
export default authSlice.reducer;